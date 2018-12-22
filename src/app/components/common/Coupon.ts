export class Coupon {

  constructor(public id: number, public title: string, public startDate: string, public endDate: string,
              public amount: number, public type: string, public message: string, public price: number, public image: string
              ) {}
}
