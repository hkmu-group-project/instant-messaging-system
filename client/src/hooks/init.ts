import * as React from "react";

import { renewAccess } from "#/openapi";
import { useUserStore } from "#/stores/user";

type Identity = {
    id: string;
    name: string;
};

const refreshIdentity = async (): Promise<Identity | undefined> => {
    const { data, error } = await renewAccess();

    if (!data || error) return void 0;

    const payload = data.data;

    return {
        id: payload.id,
        name: payload.name,
    };
};

const useInitialize = (): void => {
    const { setId, setName } = useUserStore();

    const onInitRefreshIdentity = React.useEffectEvent((): void => {
        (async (): Promise<void> => {
            const identity: Identity | undefined = await refreshIdentity();
            if (!identity) return void 0;

            setId(identity.id);
            setName(identity.name);
        })();
    });

    React.useEffect((): void => {
        onInitRefreshIdentity();
    }, []);
};

export { useInitialize };
