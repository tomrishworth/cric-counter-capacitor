import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Import Light Icons Here. Give them a 'fal' prefix instead of 'fa'.
import { faAngleLeft as falAngleLeft } from "@fortawesome/pro-light-svg-icons";

// Import Solid Icons Here. Give them a 'fas' prefix instead of 'fa'.
import { faCheck as farCheck, faEllipsisV as farEllipsisV } from "@fortawesome/pro-regular-svg-icons";

const VuePlugin = {
  install: function(Vue) {
    // Add Light Icons Here
    library.add(falAngleLeft);

    // Add Solid Icons Here
    library.add(farCheck, farEllipsisV);

    Vue.component("fa-icon", FontAwesomeIcon);
  }
};

export default VuePlugin;
