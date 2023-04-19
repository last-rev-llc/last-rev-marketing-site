# GraphQL Extensions

## Summary
Documentation for creating custom fields and resolver behavior through extensions in the LastRev Framework's GraphQL schema based on Contentful content models.

## Extensions Concepts

### TypeDefs

A TypeDef extension can be used to create new types or extend existing types. The graphql-tag library can be used to declare type definitions.

### Mappers

Mappers are a construct that we use on top of the standard Apollo GraphQL Resolvers to allow for the resolution and mapping of fields.

### Display Types

Mappers introduce the concept of a display type. This is a useful way to shoehorn one type into another.

### Field Mappers

Fields can be mapped by either using a simple string or using the standard resolver function signature.

### Apollo Context

The third argument of the resolver function is the context object.

### Structure

Mappers are defined in a 3 level object structure, with the type at the top level, the display type at the second level, and the field at the third level.

### Resolvers

Resolvers are useful when you need to create new queries, or whole new types that are not tied to content in Contentful.

### PathConfigs

Lastly, PathsConfigs is how you can define how your webiste paths are generated.

### Related Files
None

### List of questions that could be answered about this document that could make it more usful
- How do I create a new type using TypeDefs?
- How do I extend an existing type using TypeDefs?
- What is a mapper and how do I use it?
- What is a display type and how do I use it?
- How do I map fields using a simple string?
- How do I map fields using the standard resolver function signature?
- What is the Apollo Context object and how do I use it?
- How do I define PathsConfigs?
- How do I generate complex paths with child/parent logic using the loaders? 

### List of questions that could be asked that the contents of this document could be a resource for developers
- How can I customize the GraphQL schema based on Contentful content models?
- How can I add custom fields or resolver behavior to the generated schema?
- What are the different types of extensions available in the LastRev Framework's GraphQL schema?
- How can I create new types or extend existing types using TypeDefs?
- How can I map fields using mappers?
- How can I use display types to shoehorn one type into another?
- How can I define how my website paths are generated using PathsConfigs?
- How can I generate complex paths with child/parent logic using the loaders?