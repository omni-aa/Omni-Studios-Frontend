export interface SanityImageType {
    _type: 'image';
    asset: {
        _ref: string;
        _type: 'reference';
    };
    alt?: string;
}