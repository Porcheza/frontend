import { computed, ref } from "vue";

const showSidenavState = ref<boolean>(false);
const isShowSidenav = computed(() => showSidenavState.value);
const showSidebar = () => {
  showSidenavState.value = true;
};
const hideSidebar = () => {
  showSidenavState.value = false;
};

const NavController = {
  isShowSidenav,
  showSidebar,
  hideSidebar,
};

export default NavController;
