/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';

@Injectable()
export class DataService {
  getNewMetadata(ownerId?) {
    return {
      createdTime: new Date(),
      createdBy: ownerId || undefined,
    };
  }
  updateMetadata(metadata, ownerId?) {
    metadata.modifiedTime = new Date();
    metadata.modifiedBy = ownerId || undefined;
    return metadata;
  }
}
