import { createWithEqualityFn } from "zustand/traditional";
import { combine } from "zustand/middleware";
import { deepEqual } from "fast-equals";

/** - 狀態 */
export interface State {
  /** - notViewedCart */
  notViewedCart: boolean;
}
/** - 預設狀態 */
const initialState: State = {
  notViewedCart: false,
};
/** - 購物車 */
const useCartStore = createWithEqualityFn(
  combine(initialState, (set) => ({
    /** - 更改notViewedCart */
    setNotViewedCart(notViewedCart: State["notViewedCart"]) {
      if (typeof notViewedCart === "boolean") {
        set({ notViewedCart });
      }
    },
    /** - 清除notViewedCart */
    cleanNotViewedCart() {
      set({ notViewedCart: initialState.notViewedCart });
    },
  })),
  deepEqual
);
export default useCartStore;
