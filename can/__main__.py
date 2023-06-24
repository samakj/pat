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

raw_data: dict[int, can.Message] = {}

data_strings: dict[int, str] = {}

parsed_data: dict[str, int] = {}

data_map: dict[int, dict[str, tuple[int, int]]] = {}


class Formatting:
    Bold = "\x1b[1m"
    Dim = "\x1b[2m"
    Italic = "\x1b[3m"
    Underlined = "\x1b[4m"
    Blink = "\x1b[5m"
    Reverse = "\x1b[7m"
    Hidden = "\x1b[8m"
    Reset = "\x1b[0m"


class Color:
    Default = "\x1b[39m"
    Black = "\x1b[30m"
    Red = "\x1b[31m"
    Green = "\x1b[32m"
    Yellow = "\x1b[33m"
    Blue = "\x1b[34m"
    Magenta = "\x1b[35m"
    Cyan = "\x1b[36m"


def get_bit_string(_bytes: bytearray, separator: str = " ") -> str:
    return separator.join([format(byte, "08b") for byte in _bytes])


def update_data_string(message: can.Message) -> None:
    old_bit_string = (
        get_bit_string(raw_data[message.arbitration_id].data)
        if raw_data.get(message.arbitration_id) is not None
        else ""
    )
    new_bit_string = get_bit_string(message.data)

    data_string = ""

    for index, bit in enumerate(new_bit_string):
        if bit != old_bit_string[index]:
            data_string += (
                f"{Formatting.Bold}{Color.Yellow}{bit}{Color.Default}{Formatting.Reset}"
            )
        else:
            data_string += bit

    data_strings[
        message.arbitration_id
    ] = f"{message.arbitration_id:0>8x} | {message.dlc} | {data_string}"


def update_parsed_data(message: can.Message) -> None:
    if data_map.get(message.arbitration_id) is not None:
        bit_string = get_bit_string(message.data, separator="")
        for name, bit_range in data_map[message.arbitration_id]:
            parsed_data[name] = int(bit_string[bit_range[0] : bit_range[1]])


def update_screen(stdscr: Window) -> None:
    rows, cols = stdscr.getmaxyx()
    parsed_height = floor(rows / 3)

    stdscr.addstr(
        parsed_height + 1,
        0,
        "-ArbId--|-Length-|-Data-------------------------------------------------------------------",
    )

    arb_ids = sorted(data_strings.keys())

    for index, id in enumerate(arb_ids):
        row = parsed_height + index + 2
        if row < rows:
            stdscr.addstr(row, 0, data_strings[id])

    parsed_data_names = sorted(parsed_data.keys())
    parsed_data_columns = ceil(len(parsed_data_names) / parsed_height)

    if parsed_data_columns:
        column = 0
        row = 0
        for name in parsed_data_names:
            if row == parsed_height:
                row = 0
                column += 1

            stdscr.addstr(
                row,
                floor(column * cols / parsed_data_columns),
                f"{name:<8} {parsed_data[name]:>4d}",
            )
            row += 1


async def main(stdscr: Window) -> None:
    last_refresh = 0

    with can.Bus(channel="can0", bustype="socketcan", receive_own_messages=True) as bus:
        reader = can.AsyncBufferedReader()
        loop = asyncio.get_running_loop()

        update_screen(stdscr)
        stdscr.refresh()

        try:
            notifier = can.Notifier(bus, [reader], loop=loop)
            while True:
                message = await reader.get_message()
                update_data_string(message)
                update_parsed_data(message)
                update_screen(stdscr)

                t = round(time() * 1000)
                if t - last_refresh > 30:
                    stdscr.refresh()
                    last_refresh = t
        except Exception as error:
            print(error)
        finally:
            notifier.stop()


def run_async(stdscr: Window) -> None:
    asyncio.run(main(stdscr))


if __name__ == "__main__":
    curses.wrapper(run_async)
