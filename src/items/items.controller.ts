import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from '@prisma/client';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    @Get()
    async findAll(): Promise<Item[]> {
        return await this.itemsService.findAll();
    }

    @Get(':id')
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
        return await this.itemsService.findById(id);
    }

    @Post()
    async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
        return await this.itemsService.create(createItemDto);
    }

    @Put(':id')
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() item: Item): Promise<Item> {
        return await this.itemsService.update(id, item);
    }

    @Delete(':id')
    async delete(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
        return await this.itemsService.delete(id);
    }
}
