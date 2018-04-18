import React from "react";
import { Toast } from "native-base";

class Notification {
    static show(message, type) {
        type = type ? type : "danger";

        Toast.show({
            text: message,
            type,
            duration: 2500,
            position: "top"
        });
    }
}

export default Notification;
