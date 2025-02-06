import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './items.model';
import { CreateItemDto } from './dto/create-item.dto';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    @Get()
    findAll(): Item[] {
        return this.itemsService.findAll();
    }

    @Get(':id')
    findById(@Param('id', ParseUUIDPipe) id: string) {
        return this.itemsService.findById(id);
    }

    @Post()
    create(@Body() createItemDto: CreateItemDto): Item {
        
        return this.itemsService.create(createItemDto);
    }

    @Put(':id')
    update(@Param('id', ParseUUIDPipe) id: string, @Body() item: Item) {
        return this.itemsService.update(id, item);
    }

    @Delete(':id')
    delete(@Param('id', ParseUUIDPipe) id: string) {
        return this.itemsService.delete(id);
    }
}
