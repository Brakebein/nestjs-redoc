import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiExtension,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { CatsService } from './cats.service';
import { Cat } from './classes/cat.class';
import { CreateCatDto } from './dto/create-cat.dto';
import { PaginationQuery } from './dto/pagination-query.dto';

@ApiSecurity('basic')
@ApiBearerAuth()
@ApiTags('cats')
@ApiHeader({
  name: 'header',
  required: false,
  description: 'Test',
  schema: { default: 'test' },
})
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @ApiTags('create cats')
  @Post()
  @ApiOperation({ summary: 'Create cat' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: () => Cat,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiExtension('x-foo', { test: 'bar ' })
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Cat,
  })
  @ApiExtension('x-auth-type', 'NONE')
  findOne(@Param('id') id: string): Cat {
    return this.catsService.findOne(+id);
  }

  @Get()
  findAll(@Query() paginationQuery: PaginationQuery) {
    // noop
  }

  @Get('bulk')
  findAllBulk(@Query() paginationQuery: PaginationQuery[]) {
    // noop
  }

  @Post('bulk')
  async createBulk(@Body() createCatDto: CreateCatDto[]): Promise<Cat> {
    return null;
  }

  @ApiConsumes('application/x-www-form-urlencoded')
  @Post('as-form-data')
  @ApiOperation({ summary: 'Create cat' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Cat,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createAsFormData(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }

  @Get('site*splat')
  getSite() {
    // noop
  }
}
