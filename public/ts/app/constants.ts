export class Constants {
    public static get PAGE_SIZE():number {
        return 10;
    }

    public static get KEYS_LOOKUP_TABLE():{[key:string]:any} {
        return {
            "enter": 13,
            "shift": "shiftKey",
            "ctrl": "ctrlKey",
            "alt": "altKey"
        };
    }

    public static get MESSAGES():{[key:string]:string} {
        return {
            AreYouSure: "Are you sure?"
        };
    }
}