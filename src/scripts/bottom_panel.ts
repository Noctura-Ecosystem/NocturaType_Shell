import  {ref, onMounted} from "vue"


export const hovered = ref(false);
export const leaving = ref(false);
export let icons = ref<AppIcon[]>([]);

export type AppIcon = {
    name: string
    path: string
}


export function handleBackendMessage(payloads: AppIcon[]) {
    icons = ref<AppIcon[]>([]);
    for (const payload of payloads){
        console.log("PAYLOAD", payload)
        const path = `/assets/${payload.path.replace(/^\/+/, "")}`;
        const name = payload.name.replace(/^\/+/, "");
        console.log(`PATH: ${path},  NAME: ${name}`);
        icons.value.push({
            name: name,
            path: path
        });
    }
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