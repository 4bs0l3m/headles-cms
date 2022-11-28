import { Model } from 'mongoose';
import { BaseDTO } from '../dtos/common/BaseDTO';
import { IDataFilter } from '../types/IDataFilter';

export class ServiceBase<DTO extends BaseDTO, Document> {
  constructor(private model: Model<Document>) {}
  findOne(filter: DTO) {
    return this.model.findOne(filter).exec();
  }

  find(filter: DTO) {
    return this.model.find(filter).exec();
  }
  findById(id: string) {
    return this.model.findById(id);
  }
}
