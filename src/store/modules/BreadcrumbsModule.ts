import { Action, Mutation, Module, VuexModule } from "vuex-module-decorators";
import { Actions, Mutations } from "@/store/enums/StoreEnums";

interface Breadcrumb {
  title: string;
  pageBreadcrumbPath: Array<string>;
  routeCreateName: string;
  routeCreate: string;
}

interface StoreInfo {
  breadcrumbs: Breadcrumb;
}

@Module
export default class BreadcrumbsModule extends VuexModule implements StoreInfo {
  breadcrumbs = {} as Breadcrumb;

  /**
   * Get breadcrumb object for current page
   * @returns object
   */
  get getBreadcrumbs(): Breadcrumb {
    return this.breadcrumbs;
  }

  /**
   * Get breadcrumb array for current page
   * @returns object
   */
  get pageBreadcrumbPath(): Array<string> {

    return this.breadcrumbs.pageBreadcrumbPath;
  }
  /**
   * Get breadcrumb array for current page
   * @returns object
   */
  get routeCreateName(): string {
    return this.breadcrumbs.routeCreateName;
  }
  get routeCreate(): string {
    return this.breadcrumbs.routeCreate;
  }
  /**
   * Get current page title
   * @returns string
   */
  get pageTitle(): string {
    return this.breadcrumbs.title;
  }

  @Mutation
  [Mutations.SET_BREADCRUMB_MUTATION](payload) {
    this.breadcrumbs = payload;
  }

  @Action
  [Actions.SET_BREADCRUMB_ACTION](payload) {
    this.context.commit(Mutations.SET_BREADCRUMB_MUTATION, payload);
  }
}
