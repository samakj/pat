import asyncio
from typing import Optional, TYPE_CHECKING
import can
import curses
from time import time
from math import floor, ceil

if TYPE_CHECKING:
    from _curses import _CursesWindow

    Window = _CursesWindow
else:
    from typing import Any

    Window = Any


curses.init_pair(1, curses.COLOR_WHITE, curses.COLOR_BLACK)
curses.init_pair(2, curses.COLOR_RED, curses.COLOR_BLACK)


class CANSniffer:
    stdscr: Window
    raw_data: dict[int, can.Message] = {}
    data_strings: dict[int, str] = {}
    parsed_data: dict[str, int] = {}
    data_map: dict[int, dict[str, tuple[int, int]]] = {}
    last_refresh = 0

    def __init__(self, stdscr: Window) -> None:
        self.stdscr = stdscr

    def get_bit_string(self, _bytes: bytearray, separator: str = " ") -> str:
        return separator.join([format(byte, "08b") for byte in _bytes])

    def get_data_string(self, message: can.Message) -> None:
        return f"{message.arbitration_id:0>8x} |   {message.dlc}    | {self.get_bit_string(message.data)}"

    def update_parsed_data(self, message: can.Message) -> None:
        if self.data_map.get(message.arbitration_id) is not None:
            bit_string = self.get_bit_string(message.data, separator="")
            for name, bit_range in self.data_map[message.arbitration_id]:
                self.parsed_data[name] = int(bit_string[bit_range[0] : bit_range[1]])

    def init_screen(self) -> None:
        rows, _ = self.stdscr.getmaxyx()
        parsed_height = floor(rows / 3)

        self.stdscr.addstr(
            parsed_height + 1,
            0,
            "-ArbId---|-Length-|-Data-------------------------------------------------------------------",
        )

    def update_screen_raw_data(self) -> None:
        rows, _ = self.stdscr.getmaxyx()
        parsed_height = floor(rows / 3)

        arb_ids = sorted(self.raw_data.keys())

        for index, id in enumerate(arb_ids):
            row = parsed_height + index + 2
            string = self.get_data_string(self.raw_data[id])

            if row < rows:
                for col, char in enumerate(string):
                    changed = (
                        self.data_strings.get(id) is None
                        or col > len(self.data_strings[id]) - 1
                        or char != self.data_strings[id][col]
                    )
                    self.stdscr.addstr(
                        row,
                        col,
                        char,
                        curses.color_pair(2) | curses.A_BOLD
                        if changed
                        else curses.color_pair(1),
                    )

            self.data_strings[id] = string

    def update_screen_parsed_data(self) -> None:
        rows, cols = self.stdscr.getmaxyx()
        parsed_height = floor(rows / 3)

        parsed_data_names = sorted(self.parsed_data.keys())
        parsed_data_columns = ceil(len(parsed_data_names) / parsed_height)

        if parsed_data_columns:
            column = 0
            row = 0
            for name in parsed_data_names:
                if row == parsed_height:
                    row = 0
                    column += 1

                self.stdscr.addstr(
                    row,
                    floor(column * cols / parsed_data_columns),
                    f"{name:<8} {self.parsed_data[name]:>4d}",
                )
                row += 1

    def update_screen(self) -> None:
        self.update_screen_raw_data()
        self.update_screen_parsed_data()

    async def run(self, stdscr: Window) -> None:
        with can.Bus(
            channel="can0", bustype="socketcan", receive_own_messages=True
        ) as bus:
            reader = can.AsyncBufferedReader()
            loop = asyncio.get_running_loop()

            self.init_screen()
            self.stdscr.refresh()

            try:
                notifier = can.Notifier(bus, [reader], loop=loop)
                while True:
                    message = await reader.get_message()
                    self.update_data_string(message)
                    self.update_parsed_data(message)

                    t = round(time() * 1000)
                    if t - last_refresh > 30:
                        self.update_screen(stdscr)
                        self.stdscr.refresh()
                        last_refresh = t
            except:
                notifier.stop()
                raise


def run_asyncio(stdscr: Window) -> None:
    sniffer = CANSniffer(stdscr)
    asyncio.run(sniffer.run())


if __name__ == "__main__":
    curses.wrapper(run_asyncio)
