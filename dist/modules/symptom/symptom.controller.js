import { Factory } from '../../utils/factory.js';
import { SymptomModel } from '../../models/symptom.model.js';
export const allSymptoms = Factory.getAllItems(SymptomModel, {});
export const addNewSymptom = Factory.createNewItem(SymptomModel, {});
export const getSymptomById = Factory.getOneItemById(SymptomModel, {});
export const updateSymptom = Factory.updateOneItemById(SymptomModel, {});
export const deleteSymptom = Factory.deleteOneItemById(SymptomModel, {});
