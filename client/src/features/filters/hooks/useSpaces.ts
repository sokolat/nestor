// hooks/useSpaces.ts
import {useState} from 'react';
import { useQuery } from '@tanstack/react-query';
import {fetchSpaces} from '../api/space-api.ts';
import { QueryParams, Space } from '../types.ts';

export function useSpaces() {
    const [queryParams, setQueryParams] = useState<QueryParams>({
        pagination: {
            page: "1",
            limit: "5"
        }
    });
    return [useQuery({
        queryKey: ['spaces', queryParams],
        queryFn: () => fetchSpaces(queryParams),
        enabled: !!queryParams.filters
}), setQueryParams];
}

