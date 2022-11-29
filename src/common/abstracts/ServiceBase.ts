import { Model } from 'mongoose';
import { BaseDTO } from '../dtos/common/BaseDTO';

export class ServiceBase<DTO extends BaseDTO, Document> {
  constructor(private model: Model<Document>) {}
  findOne(filter: DTO) {
    return this.model.findOne(filter).exec();
  }

  find(filter: DTO) {
    return this.model.find(filter).exec();
  }
  findById(id: string) {
    return this.model.findById(id).exec();
  }
  create(model: DTO) {
    const createdModel = new this.model(model);
    return createdModel.save();
  }
  async updateById(id, model: DTO) {
    const _model = await this.model
      .findOne({
        id: id,
      })
      .exec();
    const updatedModel = await _model.updateOne(model).exec();
  }
}
