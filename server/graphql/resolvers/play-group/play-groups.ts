import { buildQuery, ListParam } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { PlayGroup } from '../../../entities'

export const playGroupsResolver = {
  async playGroups(_: any, params: ListParam, context: any) {
    const queryBuilder = getRepository(PlayGroup).createQueryBuilder()
    buildQuery(queryBuilder, params, context)
    const [items, total] = await queryBuilder
      .leftJoinAndSelect('Inventory.domain', 'Domain')
      .leftJoinAndSelect('Inventory.creator', 'Creator')
      .leftJoinAndSelect('Inventory.updater', 'Updater')
      .getManyAndCount()

    return { items, total }
  }
}
