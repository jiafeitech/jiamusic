<p align="center">
    <img alt="logo" src="https://raw.githubusercontent.com/jiafeitech/jiamusic/main/assets/logo.png">
</p>

<h2 align="center">
    JIΛmusic
</h2>
<h3 align="center">
    A music streaming service app by JIΛFEI (jiafeitech)
</h3>

## Developing and building

cvming soon.

## Backend

[PocketBase](https://pocketbase.io/) is the backend for JIΛmusic.

The exported collections will be in `pocketbase/pb_schema.json`

You can import collections by going to PocketBase Admin UI and click on Settings > Sync (Experimental) > Import collections and then upload the .json file

You can change the PocketBase base URL for this app.

```typescript
export function PocketBaseProvider({ children }: Props) {
  const pb = new PocketBase('http://example:8090'); // Here!

  return (
    <PocketBaseContext.Provider value={pb}>
      {children}
    </PocketBaseContext.Provider>
  );
}
```

## Todos

- add react-native-vector-icons to ios
