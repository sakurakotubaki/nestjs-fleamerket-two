import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Item, ItemStatus } from '@prisma/client';

@Injectable()
export class ItemsService {
    constructor(private readonly prismaService: PrismaService) {}

    async findAll(): Promise<Item[]> {
        return await this.prismaService.item.findMany();
    }

    async findById(id: string): Promise<Item> {
        const found = await this.prismaService.item.findUnique({ where: { id } });
        if (!found) {
            throw new NotFoundException(`アイテムが見つかりません。ID: ${id}`);
        }
        return found;
    }

    async create(createItemDto: CreateItemDto): Promise<Item> {
        const { name, price, description } = createItemDto;
        return await this.prismaService.item.create({
            data: {
                name,
                price,
                description,
                status: ItemStatus.ON_SALE,
                userId: '',
            },
        });
    }

    async update(id: string, item: Item): Promise<Item> {
        const found = await this.prismaService.item.findUnique({ where: { id } });
        if (!found) {
            throw new NotFoundException(`アイテムが見つかりません。ID: ${id}`);
        }
        return await this.prismaService.item.update({
            where: { id },
            data: item,
        });
    }

    async delete(id: string): Promise<Item> {
        const found = await this.prismaService.item.findUnique({ where: { id } });
        if (!found) {
            throw new NotFoundException(`アイテムが見つかりません。ID: ${id}`);
        }
        return await this.prismaService.item.delete({ where: { id } });
    }
}
