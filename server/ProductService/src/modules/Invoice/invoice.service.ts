import { Injectable } from '@nestjs/common';
import { BaseService } from '../BaseModule/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Invoices } from './invoice.entity';


@Injectable()
export class InvoiceServices extends BaseService<Invoices> {
  constructor(
    @InjectRepository(Invoices)
    private readonly invoiceRepository: Repository<Invoices>,
  ) {
    super(invoiceRepository);
  }

  async createInvoice(data: any){
    try {
      console.log(data)
        const result = this.invoiceRepository.create(data)  
        const newInvoice = await this.invoiceRepository.save(result)
        return newInvoice
    } catch (error) {
        throw error
    }
  }

  async updateInvoiceStatus(invoiceId: number, status: boolean){
      try {
        if(status){
          const result = await this.invoiceRepository.update({id: invoiceId}, {status: "paid"})       
        } 

        return true
      } catch (error) {
        throw error
      }
  }

  async myCourse(userId: number){
    try {
      const activeInvoice = await this.invoiceRepository.find({where: {user: userId, status: "paid"}, relations: {products: {category: true}}})
      const products = []
      activeInvoice.forEach(item => {
          if(item){
            products.push(...item.products)
          }
      })
      return products
    } catch (error) {
      throw error
    }
  }
}

