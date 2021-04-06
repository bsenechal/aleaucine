export const getApiUrl = () => `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_VERSION}`

export const getImageFullUrl = (posterPath: string, size: number = 200) => `${process.env.REACT_APP_IMAGE_URL}/t/p/w${size}/${posterPath}`

export const getVideoFullUrl = (movieId: number) => `${getApiUrl()}/movie/${movieId}/videos`
