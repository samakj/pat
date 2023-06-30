/** @format */

export interface CANDataType {
  timestamp: number;
  data: string;
  arbitration_id: number;
  is_extended_id: boolean;
  is_remote_frame: boolean;
  is_error_frame: boolean;
  channel: string | number;
  dlc: number;
  is_fd: boolean;
  is_rx: boolean;
  bitrate_switch: boolean;
  error_state_indicator: boolean;
}

export interface UseCANDataWebsocketPropsType {
  onOpen?: (event: Event, websocket: WebSocket | null) => void;
  onMessage?: (event: MessageEvent<string>, data: CANDataType, websocket: WebSocket | null) => void;
  onError?: (event: Event, websocket: WebSocket | null) => void;
  onClose?: (event: CloseEvent, websocket: WebSocket | null) => void;
}

export interface CANDataStateType {
  [deviceId: number]: CANDataType;
}

export interface CANSliceType {
  requests: {};
  data?: CANDataStateType;
}
