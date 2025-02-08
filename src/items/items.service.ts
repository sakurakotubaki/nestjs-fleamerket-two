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

    async create(createItemDto: CreateItemDto, userId: string): Promise<Item> {
        const { name, price, description } = createItemDto;
        return await this.prismaService.item.create({
            data: {
                name,
                price,
                description,
                status: ItemStatus.ON_SALE,
                userId: userId,
            },
        });
    }

    async update(id: string, item: Item, userId: string): Promise<Item> {
        const found = await this.prismaService.item.findUnique({ where: { id } });
        if (!found) {
            throw new NotFoundException(`アイテムが見つかりません。ID: ${id}`);
        }
        if (found.userId !== userId) {
            throw new NotFoundException('このアイテムは更新できません');
        }
        return await this.prismaService.item.update({
            where: { id },
            data: item,
        });
    }

    async delete(id: string, userId: string): Promise<Item> {
        const found = await this.prismaService.item.findUnique({ where: { id } });
        if (!found) {
            throw new NotFoundException(`アイテムが見つかりません。ID: ${id}`);
        }
        if (found.userId !== userId) {
            throw new NotFoundException('このアイテムは削除できません');
        }
        return await this.prismaService.item.delete({ where: { id } });
    }
}
