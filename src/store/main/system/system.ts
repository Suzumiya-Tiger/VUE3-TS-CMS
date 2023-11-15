import {
  postUserListData,
  deleteUserById,
  createUserData,
  editUserData,
  postPageListData,
  deletePageById,
  newPageData,
  editPageData
} from '@/service/modules/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'
import { filterEmptyParams } from '@/utils/filter-param'
import useMainStore from '../main'
const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,
    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    // 获取用户列表
    async postUsersListAction(queryInfo: any) {
      const usersListResult = await postUserListData(
        filterEmptyParams(queryInfo)
      )
      const { list, totalCount } = usersListResult.data
      this.usersTotalCount = totalCount
      this.usersList = list
    },
    // 删除用户
    async deleteUserByIdAction(id: number) {
      const deleteResult = await deleteUserById(id)
      return deleteResult
    },
    // 新建窗户
    async createUserDataAction(userInfo: any) {
      // 1.创建新的用户
      const newResult = await createUserData(userInfo)
      return newResult
    },
    // 编辑用户
    async editUserDataAction(id: number, userInfo: any) {
      // 1.编辑用户
      const editResult = await editUserData(id, userInfo)
      return editResult
    },

    /* 针对所有通用页面的数据：根据其增删改查的特性进行封装 */

    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(
        pageName,
        filterEmptyParams(queryInfo)
      )
      const { data } = pageListResult
      this.pageList = data.list
      this.pageTotalCount = data ?? data.length
    },
    async deletePageByIdAction(pageName: string, id: number) {
      const deleteResult = await deletePageById(pageName, id)

      // 获取完整的全局应用数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
      return deleteResult
    },
    async newPageDataAction(pageName: string, pageInfo: any) {
      const newResult = await newPageData(pageName, filterEmptyParams(pageInfo))

      // 获取完整的全局应用数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
      return newResult
    },
    async editPageDataAction(pageName: string, id: number, pageInfo: any) {
      console.log(id)
      const editResult = await editPageData(
        pageName,
        id,
        filterEmptyParams(pageInfo)
      )
      // 获取完整的全局应用数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
      return editResult
    }
  }
})

export default useSystemStore
