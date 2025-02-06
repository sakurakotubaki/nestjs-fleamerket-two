import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from './items.model';
import { CreateItemDto } from './dto/create-item.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ItemsService {
    private items: Item[] = [];

    findAll() {
        return this.items;
    }

    findById(id: string) {
        const found = this.items.find((item) => item.id === id);
        if (!found) {
            throw new NotFoundException(`Item with ID "${id}" not found`);
        }
        return found;
    }

    create(createItemDto: CreateItemDto) {
        const item: Item = {
            id: uuid(),
            ...createItemDto,
            status: 'ON_SALE',
        };
        this.items.push(item);
        return item;
    }

    update(id: string, item: Item) {
        const itemIndex = this.items.findIndex((item) => item.id === id);
        this.items[itemIndex] = item;
        return item;
    }

    delete(id: string) {
        const itemIndex = this.items.findIndex((item) => item.id === id);
        this.items.splice(itemIndex, 1);
    }
}
