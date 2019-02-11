import { Shortcut } from "./interfaces";

export interface Settings {
    readonly shortcuts: Shortcut[];
    readonly index: number;
}

let mockSettings: Settings = {
    shortcuts: [
        {
            id: 0,
            title: "Microsoft",
            url: "https://microsoft.com",
            tags: ["work", "microsoft"],
        },
        {
            id: 1,
            title: "IAM Portal Repo",
            url:
                "https://msazure.visualstudio.com/DefaultCollection/One/_git/AD-IAM-Services-Portal-UX",
            tags: ["iam", "azdev"],
        },
        {
            id: 2,
            title: "HRweb Global Country Holidays",
            url:
                "https://microsoft.sharepoint.com/sites/HRw/Pages/globalholidays.aspx",
            tags: ["hrweb"],
        },
        {
            id: 3,
            title: "Azure Portal Docs",
            url: "https://github.com/Azure/portaldocs",
            tags: ["ibiza", "azureportal"],
        },
        {
            id: 4,
            title: "AD-Powershell Repo",
            url: "https://msazure.visualstudio.com/One/_git/AD-powershell",
            tags: ["azdev", "repo"],
        },
        {
            id: 5,
            title: "Github",
            url: "https://github.com",
            tags: [],
        },
        {
            id: 6,
            title: "",
            url: "https://quora.com",
            tags: ["forums", "reading"],
        },
        {
            id: 7,
            title: "",
            url: "https://google.com",
            tags: [],
        },
    ],
    index: 8,
};

export function fetchSettings(): Promise<Settings> {
    return new Promise(res => {
        res(mockSettings);
    });
}

export function updateSettings(settings: Settings): Promise<Settings> {
    return new Promise(res => {
        mockSettings = settings;
        res(mockSettings);
    });
}
