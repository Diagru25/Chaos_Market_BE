import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Card, CardDocument } from '../schema';

let ObjectId = Types.ObjectId;

@Injectable()
export class CardService {
    constructor(
        @InjectModel(Card.name) private cardModel: Model<CardDocument>,
    ) {}

    async findByOwner(userId: string): Promise<Card> {
        const realUserId = new ObjectId(userId);
        return this.cardModel.findOne({ owner: realUserId }).exec();
    }

    async createCard(userId: string, data: Card): Promise<Card> {
        const convertData = {
            ...data,
            owner: new ObjectId(userId)
        };

        return this.cardModel.create(convertData);
    }
}
