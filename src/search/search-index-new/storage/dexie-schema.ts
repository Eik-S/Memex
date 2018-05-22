import StorageRegistry, { RegistryCollections } from './registry'
import { DexieSchema, CollectionDefinition, MigrationRunner } from './types'

export function getDexieHistory(storageRegistry: StorageRegistry) {
    const collections = {}
    const versions: DexieSchema[] = []
    let version = 0

    Object.entries(storageRegistry.collectionsByVersion)
        .sort((left, right) => (left[0] < right[0] ? -1 : 1))
        .forEach(([versionTimestamp, defs]) => {
            defs.forEach(def => (collections[def.name] = def))
            versions.push({
                ..._getDexieSchema(collections),
                version: ++version,
            })
        })

    return versions
}

export function _getDexieSchema(collections: RegistryCollections) {
    const schema = {}
    const migrations: MigrationRunner[] = []

    Object.entries(collections).forEach(([collectionName, collectionDef]) => {
        const dexieTable: string[] = []
        const sortedIndexedFields = collectionDef.indices.sort(
            indexName => (collectionDef.fields[indexName].pk ? -1 : 1),
        )

        sortedIndexedFields.forEach(indexName => {
            const fieldDef = collectionDef.fields[indexName]
            const listPrefix = fieldDef.type === 'text' ? '*' : ''
            const dexieField = `${listPrefix}${indexName}`
            dexieTable.push(dexieField)
        })
        schema[collectionName] = dexieTable.join(', ')

        if (collectionDef.migrate && !collectionDef.migrate._seen) {
            collectionDef.migrate._seen = true // TODO: Clean this up, should have no side-effects
            migrations.push(collectionDef.migrate)
        }
    })

    return { schema, migrations }
}