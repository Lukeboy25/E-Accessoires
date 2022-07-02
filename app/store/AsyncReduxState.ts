export type AsyncReduxState<T = unknown> = Readonly<{
    [P in keyof T]: T[P];
} & AsyncReduxProperties>;

interface AsyncReduxProperties {
    isLoading: boolean;
    isUpdating: boolean;
    isDeleting: boolean;
    isSuccessful: boolean;
    error: string;
}

export const initialAsyncReduxState: AsyncReduxState = {
    isLoading: false,
    isUpdating: false,
    isDeleting: false,
    isSuccessful: false,
    error: '',
};
