import  {ref} from "vue"
import { convertFileSrc } from "@tauri-apps/api/core";


export const hovered = ref(false);
export const leaving = ref(false);
export let icons = ref<AppIcon[]>([]);

export type AppIcon = {
    name: string
    path: string
}


export function handleBackendMessage(payloads: AppIcon[]) {
    icons = ref<AppIcon[]>([]);
    let payloadsProcessed = payloads.map(payload => ({
        ...payload,
        path: payload.path ? convertFileSrc(payload.path) : ''
    }));
    icons.value = payloadsProcessed;
};

export function onEnter() {
    console.log("BOTTOM-PANEL: Hovering");
    hovered.value = true;
    leaving.value = false;
}

export function onLeave() {
    console.log("BOTTOM-PANEL: Leaving");
    leaving.value = true;
    hovered.value = false;
}

export function open_app(icon: string, path: string, index: number) {
    console.log(icon, path, index)
}