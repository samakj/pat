/** @format */

import { Dispatch } from '../..';

export interface CANMessageType {
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

export interface MappingType {
  name: string;
  arbitration_id: number;
  bits: [from: number, to: number];
}

export interface CANWebsocketPropsType {
  dispatch: Dispatch;
  onOpen?: (event: Event, websocket: WebSocket | null) => void;
  onMessage?: (
    event: MessageEvent<string>,
    data: CANMessageType,
    websocket: WebSocket | null
  ) => void;
  onError?: (event: Event, websocket: WebSocket | null) => void;
  onClose?: (event: CloseEvent, websocket: WebSocket | null) => void;
}

export interface CANWebsocketMetaType {
  startTime?: Date;
  lastMessage?: Date;
  messageCount?: number;
  windowedMessages?: CANMessageType[];
}

export type CANMessagesStateType = {
  [arbitrationId: CANMessageType['arbitration_id']]: CANMessageType;
};

export type MappingsStateType = {
  [name: MappingType['name']]: MappingType;
};

export interface CANSliceType {
  requests: {};
  messages?: CANMessagesStateType;
  mappings?: MappingsStateType;
  websocket?: {
    startTime?: string;
    lastMessage?: string;
    messageCount?: number;
    windowedMessageCount?: number;
  };
}
