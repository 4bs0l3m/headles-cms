/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ContentFieldDataService } from '../services/content-field-data.service';
import { ContentFieldTypeService } from '../services/content-field-type.service';
import { ContentLangService } from '../services/content-lang.service';
import { ContentTypeFieldService } from '../services/content-type-field.service';
import { ContentTypeTemplateService } from '../services/content-type-template.service';
import { ContentTypeService } from '../services/content-type.service';
import { ContentService } from '../services/content.service';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    ContentService,
    ContentTypeTemplateService,
    ContentFieldTypeService,
    ContentTypeFieldService,
    ContentLangService,
    ContentFieldDataService,
    ContentTypeService,
    DataService,
    UserService,
  ],
})
export class BussinessModule {}
