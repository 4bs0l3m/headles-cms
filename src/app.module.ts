import { ContentTypeService } from './services/content-type.service';
import { ContentService } from './services/content.service';
import { DataService } from './services/data.service';
import { UserService } from './services/user.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from './env.const';
import { User } from './common/dtos/auth/User.dto';
import { UserSchema } from './common/schemas/user.schema';
import { Content } from './common/dtos/cms/Content.dto';
import { ContentSchema } from './common/schemas/content.schema';
import { ContentType } from './common/dtos/cms/ContentType.dto';
import { ContentTypeSchema } from './common/schemas/content-type.schema';
import { AuthController } from './controllers/auth.controller';
import { ContentFieldDataService } from './services/content-field-data.service';
import { ContentLangService } from './services/content-lang.service';
import { ContentTypeFieldService } from './services/content-type-field.service';
import { ContentFieldTypeService } from './services/content-field-type.service';
import { ContentTypeTemplateService } from './services/content-type-template.service';
import { ContentTypeField } from './common/dtos/cms/ContentTypeField.dto';
import { ContentTypeFieldSchema } from './common/schemas/content-type-field.schema';
import { ContentFieldData } from './common/dtos/cms/ContentFieldData.dto';
import { ContentFieldType } from './common/dtos/cms/ContentFieldType.dto';
import { ContentLang } from './common/dtos/cms/ContentLang.dto';
import { ContentTypeTemplate } from './common/dtos/cms/ContentTypeTemplate.dto';
import { ContentFieldDataSchema } from './common/schemas/content-field-data.schema';
import { ContentFieldTypeSchema } from './common/schemas/content-field-type.schema';
import { ContentLangSchema } from './common/schemas/content-lang.schema';
import { ContentTypeTemplateSchema } from './common/schemas/content-type-template.schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthHelper } from './helpers/auth.helper';
@Module({
  imports: [
    MongooseModule.forRoot(environment.mongoURL),
    JwtModule.register({
      secret: environment.secret,
      signOptions: { expiresIn: '12h' },
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Content.name, schema: ContentSchema },
      { name: ContentType.name, schema: ContentTypeSchema },
      { name: ContentTypeField.name, schema: ContentTypeFieldSchema },
      { name: ContentFieldData.name, schema: ContentFieldDataSchema },
      { name: ContentFieldType.name, schema: ContentFieldTypeSchema },
      { name: ContentLang.name, schema: ContentLangSchema },
      { name: ContentTypeTemplate.name, schema: ContentTypeTemplateSchema },
    ]),
  ],
  controllers: [AppController, AuthController],
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
    AppService,
    AuthHelper,
  ],
  exports: [MongooseModule],
})
export class AppModule {}
