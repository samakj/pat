/** @format */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { MappingType } from './types';
import { Url } from '../../../utils/url';

export const MappingsUrl = new Url(`/v0/can/mappings`);

export const getMappings = createAsyncThunk<MappingType[]>('getMappings', async () =>
  fetch(`http://${location.hostname}:9000${MappingsUrl.build()}`).then((response) =>
    response.json()
  )
);
