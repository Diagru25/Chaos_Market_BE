import { Controller, Get, Param, Res } from '@nestjs/common';

@Controller('v1/resources')
export class ResourcesController {
    constructor() {}

    @Get('/images/:fileName')
    async getImage(@Param('fileName') filename, @Res() res) {
        res.sendFile(filename, { root: 'images' });
    }
}
