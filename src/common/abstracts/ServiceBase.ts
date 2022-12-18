import { Model } from 'mongoose';
import { BaseDTO } from '../dtos/common/BaseDTO';

export class ServiceBase<DTO extends BaseDTO, Document> {
  constructor(private model: Model<Document>) {}
  newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      },
    );
  }
  findOne(filter: DTO) {
    return this.model.findOne(filter).exec();
  }

  find(filter: DTO) {
    return this.model.find(filter).exec();
  }
  findById(id: string) {
    return this.model.findOne({ id: id }).exec();
  }
  create(model: DTO, userId: string) {
    model.id = this.newGuid();
    model.metadata = {
      createdBy: userId,
      createdTime: new Date().toLocaleDateString(),
    };
    const createdModel = new this.model(model);

    return createdModel.save();
  }
  async updateById(id, model: DTO, userId: string) {
    const _model = await this.model
      .findOne({
        id: id,
      })
      .exec();
    if (_model) {
      model.metadata.modifiedBy = userId;
      model.metadata.modifiedTime = new Date().toLocaleDateString();
      const updatedModel = await _model.updateOne(model).exec();
      return updatedModel;
    } else {
      return null;
    }
  }
}
