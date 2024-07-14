import { BadRequestException, PipeTransform } from "@nestjs/common";
import { ZodSchema } from "zod";

export class ZodValidationPipe implements PipeTransform {
    constructor(private readonly schema: ZodSchema) {}
    transform(value: any) {
        try {
            const parseValue = this.schema.parse(value);
            return parseValue;
        } catch(error) {
            throw new BadRequestException(error.issues);
        }
    }
    
}