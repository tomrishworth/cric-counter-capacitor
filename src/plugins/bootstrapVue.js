import {
  Alert,
  Badge,
  Breadcrumb,
  Button,
  ButtonGroup,
  Dropdown,
  Form,
  FormCheckbox,
  FormFile,
  FormGroup,
  FormInput,
  FormRadio,
  FormSelect,
  ListGroup,
  Modal,
  Nav,
  Navbar
} from "bootstrap-vue/es/components";

const VuePlugin = {
  install: function(Vue) {
    Vue.use(Alert);
    Vue.use(Badge);
    Vue.use(Breadcrumb);
    Vue.use(Button);
    Vue.use(ButtonGroup);
    Vue.use(Dropdown);
    Vue.use(Form);
    Vue.use(FormCheckbox);
    Vue.use(FormFile);
    Vue.use(FormGroup);
    Vue.use(FormInput);
    Vue.use(FormRadio);
    Vue.use(FormSelect);
    Vue.use(ListGroup);
    Vue.use(Modal);
    Vue.use(Nav);
    Vue.use(Navbar);
  }
};

export default VuePlugin;
