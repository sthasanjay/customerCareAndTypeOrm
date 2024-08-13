import moment, { Moment } from "moment";
import { FindOperator, ValueTransformer } from "typeorm";

export class DateTransformer implements ValueTransformer {
  from(value: Date): Moment {
    return moment(value);
  }

  to(value: Moment | FindOperator<any>): Date | string | FindOperator<any> {
    if (!value) return undefined;
    else if (moment.isMoment(value)) {
      return value.toDate(); //.format("YYYY-MM-DD HH:MM:SS.SSSSSSZ");
    }
    return value;
  }
}
