import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';
import { RequestUser } from 'src/types/requestUser';

interface RequestWithUser extends ExpressRequest {
    user: RequestUser;
}

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
    @UseGuards(AuthGuard('jwt'))
    async create(
        @Body() createItemDto: CreateItemDto,
        @Request() req: RequestWithUser): Promise<Item> {
        return await this.itemsService.create(createItemDto, req.user.id);
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() item: Item,
        @Request() req: RequestWithUser): Promise<Item> {
        return await this.itemsService.update(id, item, req.user.id);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async delete(
        @Param('id', ParseUUIDPipe) id: string,
        @Request() req: RequestWithUser): Promise<Item> {
        return await this.itemsService.delete(id, req.user.id);
    }
}
