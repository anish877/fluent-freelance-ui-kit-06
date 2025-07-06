
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Job
 * 
 */
export type Job = $Result.DefaultSelection<Prisma.$JobPayload>
/**
 * Model Proposal
 * 
 */
export type Proposal = $Result.DefaultSelection<Prisma.$ProposalPayload>
/**
 * Model Review
 * 
 */
export type Review = $Result.DefaultSelection<Prisma.$ReviewPayload>
/**
 * Model Conversation
 * 
 */
export type Conversation = $Result.DefaultSelection<Prisma.$ConversationPayload>
/**
 * Model Message
 * 
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>
/**
 * Model SavedFreelancer
 * 
 */
export type SavedFreelancer = $Result.DefaultSelection<Prisma.$SavedFreelancerPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserType: {
  FREELANCER: 'FREELANCER',
  CLIENT: 'CLIENT'
};

export type UserType = (typeof UserType)[keyof typeof UserType]


export const JobStatus: {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

export type JobStatus = (typeof JobStatus)[keyof typeof JobStatus]


export const ProposalStatus: {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  WITHDRAWN: 'WITHDRAWN'
};

export type ProposalStatus = (typeof ProposalStatus)[keyof typeof ProposalStatus]


export const BudgetType: {
  FIXED: 'FIXED',
  HOURLY: 'HOURLY'
};

export type BudgetType = (typeof BudgetType)[keyof typeof BudgetType]


export const NotificationType: {
  PROPOSAL_RECEIVED: 'PROPOSAL_RECEIVED',
  PROPOSAL_ACCEPTED: 'PROPOSAL_ACCEPTED',
  PROPOSAL_REJECTED: 'PROPOSAL_REJECTED',
  MESSAGE_RECEIVED: 'MESSAGE_RECEIVED',
  JOB_POSTED: 'JOB_POSTED',
  PAYMENT_RECEIVED: 'PAYMENT_RECEIVED',
  SYSTEM_UPDATE: 'SYSTEM_UPDATE'
};

export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType]

}

export type UserType = $Enums.UserType

export const UserType: typeof $Enums.UserType

export type JobStatus = $Enums.JobStatus

export const JobStatus: typeof $Enums.JobStatus

export type ProposalStatus = $Enums.ProposalStatus

export const ProposalStatus: typeof $Enums.ProposalStatus

export type BudgetType = $Enums.BudgetType

export const BudgetType: typeof $Enums.BudgetType

export type NotificationType = $Enums.NotificationType

export const NotificationType: typeof $Enums.NotificationType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.job`: Exposes CRUD operations for the **Job** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Jobs
    * const jobs = await prisma.job.findMany()
    * ```
    */
  get job(): Prisma.JobDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.proposal`: Exposes CRUD operations for the **Proposal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Proposals
    * const proposals = await prisma.proposal.findMany()
    * ```
    */
  get proposal(): Prisma.ProposalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.review`: Exposes CRUD operations for the **Review** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reviews
    * const reviews = await prisma.review.findMany()
    * ```
    */
  get review(): Prisma.ReviewDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.conversation`: Exposes CRUD operations for the **Conversation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Conversations
    * const conversations = await prisma.conversation.findMany()
    * ```
    */
  get conversation(): Prisma.ConversationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.savedFreelancer`: Exposes CRUD operations for the **SavedFreelancer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SavedFreelancers
    * const savedFreelancers = await prisma.savedFreelancer.findMany()
    * ```
    */
  get savedFreelancer(): Prisma.SavedFreelancerDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.11.0
   * Query Engine version: 9c30299f5a0ea26a96790e13f796dc6094db3173
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Job: 'Job',
    Proposal: 'Proposal',
    Review: 'Review',
    Conversation: 'Conversation',
    Message: 'Message',
    Notification: 'Notification',
    SavedFreelancer: 'SavedFreelancer'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "job" | "proposal" | "review" | "conversation" | "message" | "notification" | "savedFreelancer"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Job: {
        payload: Prisma.$JobPayload<ExtArgs>
        fields: Prisma.JobFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JobFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JobFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          findFirst: {
            args: Prisma.JobFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JobFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          findMany: {
            args: Prisma.JobFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>[]
          }
          create: {
            args: Prisma.JobCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          createMany: {
            args: Prisma.JobCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JobCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>[]
          }
          delete: {
            args: Prisma.JobDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          update: {
            args: Prisma.JobUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          deleteMany: {
            args: Prisma.JobDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JobUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.JobUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>[]
          }
          upsert: {
            args: Prisma.JobUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          aggregate: {
            args: Prisma.JobAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJob>
          }
          groupBy: {
            args: Prisma.JobGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobGroupByOutputType>[]
          }
          count: {
            args: Prisma.JobCountArgs<ExtArgs>
            result: $Utils.Optional<JobCountAggregateOutputType> | number
          }
        }
      }
      Proposal: {
        payload: Prisma.$ProposalPayload<ExtArgs>
        fields: Prisma.ProposalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProposalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProposalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProposalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProposalPayload>
          }
          findFirst: {
            args: Prisma.ProposalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProposalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProposalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProposalPayload>
          }
          findMany: {
            args: Prisma.ProposalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProposalPayload>[]
          }
          create: {
            args: Prisma.ProposalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProposalPayload>
          }
          createMany: {
            args: Prisma.ProposalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProposalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProposalPayload>[]
          }
          delete: {
            args: Prisma.ProposalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProposalPayload>
          }
          update: {
            args: Prisma.ProposalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProposalPayload>
          }
          deleteMany: {
            args: Prisma.ProposalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProposalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProposalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProposalPayload>[]
          }
          upsert: {
            args: Prisma.ProposalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProposalPayload>
          }
          aggregate: {
            args: Prisma.ProposalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProposal>
          }
          groupBy: {
            args: Prisma.ProposalGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProposalGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProposalCountArgs<ExtArgs>
            result: $Utils.Optional<ProposalCountAggregateOutputType> | number
          }
        }
      }
      Review: {
        payload: Prisma.$ReviewPayload<ExtArgs>
        fields: Prisma.ReviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findFirst: {
            args: Prisma.ReviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findMany: {
            args: Prisma.ReviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          create: {
            args: Prisma.ReviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          createMany: {
            args: Prisma.ReviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReviewCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          delete: {
            args: Prisma.ReviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          update: {
            args: Prisma.ReviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          deleteMany: {
            args: Prisma.ReviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReviewUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          upsert: {
            args: Prisma.ReviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          aggregate: {
            args: Prisma.ReviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReview>
          }
          groupBy: {
            args: Prisma.ReviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReviewGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReviewCountArgs<ExtArgs>
            result: $Utils.Optional<ReviewCountAggregateOutputType> | number
          }
        }
      }
      Conversation: {
        payload: Prisma.$ConversationPayload<ExtArgs>
        fields: Prisma.ConversationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConversationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConversationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          findFirst: {
            args: Prisma.ConversationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConversationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          findMany: {
            args: Prisma.ConversationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[]
          }
          create: {
            args: Prisma.ConversationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          createMany: {
            args: Prisma.ConversationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConversationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[]
          }
          delete: {
            args: Prisma.ConversationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          update: {
            args: Prisma.ConversationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          deleteMany: {
            args: Prisma.ConversationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConversationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConversationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[]
          }
          upsert: {
            args: Prisma.ConversationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          aggregate: {
            args: Prisma.ConversationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConversation>
          }
          groupBy: {
            args: Prisma.ConversationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConversationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConversationCountArgs<ExtArgs>
            result: $Utils.Optional<ConversationCountAggregateOutputType> | number
          }
        }
      }
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
      SavedFreelancer: {
        payload: Prisma.$SavedFreelancerPayload<ExtArgs>
        fields: Prisma.SavedFreelancerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SavedFreelancerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedFreelancerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SavedFreelancerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedFreelancerPayload>
          }
          findFirst: {
            args: Prisma.SavedFreelancerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedFreelancerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SavedFreelancerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedFreelancerPayload>
          }
          findMany: {
            args: Prisma.SavedFreelancerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedFreelancerPayload>[]
          }
          create: {
            args: Prisma.SavedFreelancerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedFreelancerPayload>
          }
          createMany: {
            args: Prisma.SavedFreelancerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SavedFreelancerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedFreelancerPayload>[]
          }
          delete: {
            args: Prisma.SavedFreelancerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedFreelancerPayload>
          }
          update: {
            args: Prisma.SavedFreelancerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedFreelancerPayload>
          }
          deleteMany: {
            args: Prisma.SavedFreelancerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SavedFreelancerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SavedFreelancerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedFreelancerPayload>[]
          }
          upsert: {
            args: Prisma.SavedFreelancerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedFreelancerPayload>
          }
          aggregate: {
            args: Prisma.SavedFreelancerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSavedFreelancer>
          }
          groupBy: {
            args: Prisma.SavedFreelancerGroupByArgs<ExtArgs>
            result: $Utils.Optional<SavedFreelancerGroupByOutputType>[]
          }
          count: {
            args: Prisma.SavedFreelancerCountArgs<ExtArgs>
            result: $Utils.Optional<SavedFreelancerCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    job?: JobOmit
    proposal?: ProposalOmit
    review?: ReviewOmit
    conversation?: ConversationOmit
    message?: MessageOmit
    notification?: NotificationOmit
    savedFreelancer?: SavedFreelancerOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    jobsPosted: number
    proposals: number
    reviews: number
    receivedReviews: number
    messages: number
    receivedMessages: number
    notifications: number
    savedFreelancers: number
    savedByUsers: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jobsPosted?: boolean | UserCountOutputTypeCountJobsPostedArgs
    proposals?: boolean | UserCountOutputTypeCountProposalsArgs
    reviews?: boolean | UserCountOutputTypeCountReviewsArgs
    receivedReviews?: boolean | UserCountOutputTypeCountReceivedReviewsArgs
    messages?: boolean | UserCountOutputTypeCountMessagesArgs
    receivedMessages?: boolean | UserCountOutputTypeCountReceivedMessagesArgs
    notifications?: boolean | UserCountOutputTypeCountNotificationsArgs
    savedFreelancers?: boolean | UserCountOutputTypeCountSavedFreelancersArgs
    savedByUsers?: boolean | UserCountOutputTypeCountSavedByUsersArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountJobsPostedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProposalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProposalWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReceivedReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReceivedMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSavedFreelancersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SavedFreelancerWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSavedByUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SavedFreelancerWhereInput
  }


  /**
   * Count Type JobCountOutputType
   */

  export type JobCountOutputType = {
    conversation: number
    proposals: number
    reviews: number
  }

  export type JobCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | JobCountOutputTypeCountConversationArgs
    proposals?: boolean | JobCountOutputTypeCountProposalsArgs
    reviews?: boolean | JobCountOutputTypeCountReviewsArgs
  }

  // Custom InputTypes
  /**
   * JobCountOutputType without action
   */
  export type JobCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobCountOutputType
     */
    select?: JobCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * JobCountOutputType without action
   */
  export type JobCountOutputTypeCountConversationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationWhereInput
  }

  /**
   * JobCountOutputType without action
   */
  export type JobCountOutputTypeCountProposalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProposalWhereInput
  }

  /**
   * JobCountOutputType without action
   */
  export type JobCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }


  /**
   * Count Type ConversationCountOutputType
   */

  export type ConversationCountOutputType = {
    messages: number
  }

  export type ConversationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | ConversationCountOutputTypeCountMessagesArgs
  }

  // Custom InputTypes
  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationCountOutputType
     */
    select?: ConversationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }


  /**
   * Count Type MessageCountOutputType
   */

  export type MessageCountOutputType = {
    conversationAsLastMessage: number
  }

  export type MessageCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversationAsLastMessage?: boolean | MessageCountOutputTypeCountConversationAsLastMessageArgs
  }

  // Custom InputTypes
  /**
   * MessageCountOutputType without action
   */
  export type MessageCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageCountOutputType
     */
    select?: MessageCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MessageCountOutputType without action
   */
  export type MessageCountOutputTypeCountConversationAsLastMessageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    onboardingStep: number | null
    hourlyRate: number | null
    successRate: number | null
    completedJobs: number | null
    onTime: number | null
    onBudget: number | null
    profileStrength: number | null
    repeatHireRate: number | null
    rating: number | null
    reviewCount: number | null
  }

  export type UserSumAggregateOutputType = {
    onboardingStep: number | null
    hourlyRate: number | null
    successRate: number | null
    completedJobs: number | null
    onTime: number | null
    onBudget: number | null
    profileStrength: number | null
    repeatHireRate: number | null
    rating: number | null
    reviewCount: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    googleId: string | null
    email: string | null
    password: string | null
    firstName: string | null
    lastName: string | null
    avatar: string | null
    bio: string | null
    location: string | null
    phone: string | null
    userType: $Enums.UserType | null
    isOnboarded: boolean | null
    onboardingStep: number | null
    createdAt: Date | null
    updatedAt: Date | null
    country: string | null
    city: string | null
    timezone: string | null
    title: string | null
    overview: string | null
    hourlyRate: number | null
    portfolio: string | null
    experience: string | null
    availability: string | null
    category: string | null
    subcategory: string | null
    experienceLevel: string | null
    totalEarnings: string | null
    successRate: number | null
    completedJobs: number | null
    onTime: number | null
    onBudget: number | null
    responseTime: string | null
    lastActive: string | null
    topRatedPlus: boolean | null
    verified: boolean | null
    risingTalent: boolean | null
    memberSince: string | null
    profileStrength: number | null
    repeatHireRate: number | null
    rating: number | null
    reviewCount: number | null
    coverImage: string | null
    isOnline: boolean | null
    hourlyRateRange: string | null
    availabilityStatus: string | null
    companyName: string | null
    companySize: string | null
    industry: string | null
    companyWebsite: string | null
    companyDescription: string | null
    budgetRange: string | null
    clientType: string | null
    howDidYouHear: string | null
    urgencyLevel: string | null
    preferredWorkingStyle: string | null
    projectDescription: string | null
    paymentPreference: string | null
    projectFrequency: string | null
    averageProjectDuration: string | null
    maxHourlyRate: string | null
    totalMonthlyBudget: string | null
    hoursPerWeek: string | null
    minimumProjectBudget: string | null
    specialRequirements: string | null
    idDocument: string | null
    addressProof: string | null
    taxInformation: string | null
    phoneVerified: boolean | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    googleId: string | null
    email: string | null
    password: string | null
    firstName: string | null
    lastName: string | null
    avatar: string | null
    bio: string | null
    location: string | null
    phone: string | null
    userType: $Enums.UserType | null
    isOnboarded: boolean | null
    onboardingStep: number | null
    createdAt: Date | null
    updatedAt: Date | null
    country: string | null
    city: string | null
    timezone: string | null
    title: string | null
    overview: string | null
    hourlyRate: number | null
    portfolio: string | null
    experience: string | null
    availability: string | null
    category: string | null
    subcategory: string | null
    experienceLevel: string | null
    totalEarnings: string | null
    successRate: number | null
    completedJobs: number | null
    onTime: number | null
    onBudget: number | null
    responseTime: string | null
    lastActive: string | null
    topRatedPlus: boolean | null
    verified: boolean | null
    risingTalent: boolean | null
    memberSince: string | null
    profileStrength: number | null
    repeatHireRate: number | null
    rating: number | null
    reviewCount: number | null
    coverImage: string | null
    isOnline: boolean | null
    hourlyRateRange: string | null
    availabilityStatus: string | null
    companyName: string | null
    companySize: string | null
    industry: string | null
    companyWebsite: string | null
    companyDescription: string | null
    budgetRange: string | null
    clientType: string | null
    howDidYouHear: string | null
    urgencyLevel: string | null
    preferredWorkingStyle: string | null
    projectDescription: string | null
    paymentPreference: string | null
    projectFrequency: string | null
    averageProjectDuration: string | null
    maxHourlyRate: string | null
    totalMonthlyBudget: string | null
    hoursPerWeek: string | null
    minimumProjectBudget: string | null
    specialRequirements: string | null
    idDocument: string | null
    addressProof: string | null
    taxInformation: string | null
    phoneVerified: boolean | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    googleId: number
    email: number
    password: number
    firstName: number
    lastName: number
    avatar: number
    bio: number
    location: number
    phone: number
    userType: number
    isOnboarded: number
    onboardingStep: number
    createdAt: number
    updatedAt: number
    country: number
    city: number
    timezone: number
    title: number
    overview: number
    skills: number
    topSkills: number
    serviceOfferings: number
    hourlyRate: number
    portfolio: number
    experience: number
    education: number
    workExperience: number
    certifications: number
    availability: number
    languages: number
    socialLinks: number
    category: number
    subcategory: number
    experienceLevel: number
    totalEarnings: number
    successRate: number
    completedJobs: number
    onTime: number
    onBudget: number
    responseTime: number
    lastActive: number
    topRatedPlus: number
    verified: number
    risingTalent: number
    portfolioItems: number
    testScores: number
    specializations: number
    memberSince: number
    profileStrength: number
    repeatHireRate: number
    rating: number
    reviewCount: number
    portfolioProjects: number
    workHistory: number
    employmentHistory: number
    coverImage: number
    isOnline: number
    hourlyRateRange: number
    availabilityStatus: number
    companyName: number
    companySize: number
    industry: number
    companyWebsite: number
    companyDescription: number
    projectTypes: number
    preferredSkills: number
    budgetRange: number
    clientType: number
    howDidYouHear: number
    interestedCategories: number
    urgencyLevel: number
    preferredWorkingStyle: number
    communicationPreference: number
    projectDescription: number
    paymentPreference: number
    projectFrequency: number
    averageProjectDuration: number
    maxHourlyRate: number
    totalMonthlyBudget: number
    projectBasedRates: number
    hoursPerWeek: number
    workingHours: number
    workingDays: number
    minimumProjectBudget: number
    specialRequirements: number
    idDocument: number
    addressProof: number
    taxInformation: number
    phoneVerified: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    onboardingStep?: true
    hourlyRate?: true
    successRate?: true
    completedJobs?: true
    onTime?: true
    onBudget?: true
    profileStrength?: true
    repeatHireRate?: true
    rating?: true
    reviewCount?: true
  }

  export type UserSumAggregateInputType = {
    onboardingStep?: true
    hourlyRate?: true
    successRate?: true
    completedJobs?: true
    onTime?: true
    onBudget?: true
    profileStrength?: true
    repeatHireRate?: true
    rating?: true
    reviewCount?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    googleId?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    avatar?: true
    bio?: true
    location?: true
    phone?: true
    userType?: true
    isOnboarded?: true
    onboardingStep?: true
    createdAt?: true
    updatedAt?: true
    country?: true
    city?: true
    timezone?: true
    title?: true
    overview?: true
    hourlyRate?: true
    portfolio?: true
    experience?: true
    availability?: true
    category?: true
    subcategory?: true
    experienceLevel?: true
    totalEarnings?: true
    successRate?: true
    completedJobs?: true
    onTime?: true
    onBudget?: true
    responseTime?: true
    lastActive?: true
    topRatedPlus?: true
    verified?: true
    risingTalent?: true
    memberSince?: true
    profileStrength?: true
    repeatHireRate?: true
    rating?: true
    reviewCount?: true
    coverImage?: true
    isOnline?: true
    hourlyRateRange?: true
    availabilityStatus?: true
    companyName?: true
    companySize?: true
    industry?: true
    companyWebsite?: true
    companyDescription?: true
    budgetRange?: true
    clientType?: true
    howDidYouHear?: true
    urgencyLevel?: true
    preferredWorkingStyle?: true
    projectDescription?: true
    paymentPreference?: true
    projectFrequency?: true
    averageProjectDuration?: true
    maxHourlyRate?: true
    totalMonthlyBudget?: true
    hoursPerWeek?: true
    minimumProjectBudget?: true
    specialRequirements?: true
    idDocument?: true
    addressProof?: true
    taxInformation?: true
    phoneVerified?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    googleId?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    avatar?: true
    bio?: true
    location?: true
    phone?: true
    userType?: true
    isOnboarded?: true
    onboardingStep?: true
    createdAt?: true
    updatedAt?: true
    country?: true
    city?: true
    timezone?: true
    title?: true
    overview?: true
    hourlyRate?: true
    portfolio?: true
    experience?: true
    availability?: true
    category?: true
    subcategory?: true
    experienceLevel?: true
    totalEarnings?: true
    successRate?: true
    completedJobs?: true
    onTime?: true
    onBudget?: true
    responseTime?: true
    lastActive?: true
    topRatedPlus?: true
    verified?: true
    risingTalent?: true
    memberSince?: true
    profileStrength?: true
    repeatHireRate?: true
    rating?: true
    reviewCount?: true
    coverImage?: true
    isOnline?: true
    hourlyRateRange?: true
    availabilityStatus?: true
    companyName?: true
    companySize?: true
    industry?: true
    companyWebsite?: true
    companyDescription?: true
    budgetRange?: true
    clientType?: true
    howDidYouHear?: true
    urgencyLevel?: true
    preferredWorkingStyle?: true
    projectDescription?: true
    paymentPreference?: true
    projectFrequency?: true
    averageProjectDuration?: true
    maxHourlyRate?: true
    totalMonthlyBudget?: true
    hoursPerWeek?: true
    minimumProjectBudget?: true
    specialRequirements?: true
    idDocument?: true
    addressProof?: true
    taxInformation?: true
    phoneVerified?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    googleId?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    avatar?: true
    bio?: true
    location?: true
    phone?: true
    userType?: true
    isOnboarded?: true
    onboardingStep?: true
    createdAt?: true
    updatedAt?: true
    country?: true
    city?: true
    timezone?: true
    title?: true
    overview?: true
    skills?: true
    topSkills?: true
    serviceOfferings?: true
    hourlyRate?: true
    portfolio?: true
    experience?: true
    education?: true
    workExperience?: true
    certifications?: true
    availability?: true
    languages?: true
    socialLinks?: true
    category?: true
    subcategory?: true
    experienceLevel?: true
    totalEarnings?: true
    successRate?: true
    completedJobs?: true
    onTime?: true
    onBudget?: true
    responseTime?: true
    lastActive?: true
    topRatedPlus?: true
    verified?: true
    risingTalent?: true
    portfolioItems?: true
    testScores?: true
    specializations?: true
    memberSince?: true
    profileStrength?: true
    repeatHireRate?: true
    rating?: true
    reviewCount?: true
    portfolioProjects?: true
    workHistory?: true
    employmentHistory?: true
    coverImage?: true
    isOnline?: true
    hourlyRateRange?: true
    availabilityStatus?: true
    companyName?: true
    companySize?: true
    industry?: true
    companyWebsite?: true
    companyDescription?: true
    projectTypes?: true
    preferredSkills?: true
    budgetRange?: true
    clientType?: true
    howDidYouHear?: true
    interestedCategories?: true
    urgencyLevel?: true
    preferredWorkingStyle?: true
    communicationPreference?: true
    projectDescription?: true
    paymentPreference?: true
    projectFrequency?: true
    averageProjectDuration?: true
    maxHourlyRate?: true
    totalMonthlyBudget?: true
    projectBasedRates?: true
    hoursPerWeek?: true
    workingHours?: true
    workingDays?: true
    minimumProjectBudget?: true
    specialRequirements?: true
    idDocument?: true
    addressProof?: true
    taxInformation?: true
    phoneVerified?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    googleId: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    avatar: string | null
    bio: string | null
    location: string | null
    phone: string | null
    userType: $Enums.UserType
    isOnboarded: boolean
    onboardingStep: number
    createdAt: Date
    updatedAt: Date
    country: string | null
    city: string | null
    timezone: string | null
    title: string | null
    overview: string | null
    skills: JsonValue | null
    topSkills: string[]
    serviceOfferings: string[]
    hourlyRate: number | null
    portfolio: string | null
    experience: string | null
    education: JsonValue | null
    workExperience: JsonValue | null
    certifications: string[]
    availability: string | null
    languages: JsonValue | null
    socialLinks: JsonValue | null
    category: string | null
    subcategory: string | null
    experienceLevel: string | null
    totalEarnings: string | null
    successRate: number | null
    completedJobs: number | null
    onTime: number | null
    onBudget: number | null
    responseTime: string | null
    lastActive: string | null
    topRatedPlus: boolean
    verified: boolean
    risingTalent: boolean
    portfolioItems: JsonValue | null
    testScores: JsonValue | null
    specializations: string[]
    memberSince: string | null
    profileStrength: number | null
    repeatHireRate: number | null
    rating: number | null
    reviewCount: number | null
    portfolioProjects: JsonValue | null
    workHistory: JsonValue | null
    employmentHistory: JsonValue | null
    coverImage: string | null
    isOnline: boolean
    hourlyRateRange: string | null
    availabilityStatus: string | null
    companyName: string | null
    companySize: string | null
    industry: string | null
    companyWebsite: string | null
    companyDescription: string | null
    projectTypes: string[]
    preferredSkills: string[]
    budgetRange: string | null
    clientType: string | null
    howDidYouHear: string | null
    interestedCategories: string[]
    urgencyLevel: string | null
    preferredWorkingStyle: string | null
    communicationPreference: string[]
    projectDescription: string | null
    paymentPreference: string | null
    projectFrequency: string | null
    averageProjectDuration: string | null
    maxHourlyRate: string | null
    totalMonthlyBudget: string | null
    projectBasedRates: JsonValue | null
    hoursPerWeek: string | null
    workingHours: JsonValue | null
    workingDays: string[]
    minimumProjectBudget: string | null
    specialRequirements: string | null
    idDocument: string | null
    addressProof: string | null
    taxInformation: string | null
    phoneVerified: boolean
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    googleId?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    avatar?: boolean
    bio?: boolean
    location?: boolean
    phone?: boolean
    userType?: boolean
    isOnboarded?: boolean
    onboardingStep?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    country?: boolean
    city?: boolean
    timezone?: boolean
    title?: boolean
    overview?: boolean
    skills?: boolean
    topSkills?: boolean
    serviceOfferings?: boolean
    hourlyRate?: boolean
    portfolio?: boolean
    experience?: boolean
    education?: boolean
    workExperience?: boolean
    certifications?: boolean
    availability?: boolean
    languages?: boolean
    socialLinks?: boolean
    category?: boolean
    subcategory?: boolean
    experienceLevel?: boolean
    totalEarnings?: boolean
    successRate?: boolean
    completedJobs?: boolean
    onTime?: boolean
    onBudget?: boolean
    responseTime?: boolean
    lastActive?: boolean
    topRatedPlus?: boolean
    verified?: boolean
    risingTalent?: boolean
    portfolioItems?: boolean
    testScores?: boolean
    specializations?: boolean
    memberSince?: boolean
    profileStrength?: boolean
    repeatHireRate?: boolean
    rating?: boolean
    reviewCount?: boolean
    portfolioProjects?: boolean
    workHistory?: boolean
    employmentHistory?: boolean
    coverImage?: boolean
    isOnline?: boolean
    hourlyRateRange?: boolean
    availabilityStatus?: boolean
    companyName?: boolean
    companySize?: boolean
    industry?: boolean
    companyWebsite?: boolean
    companyDescription?: boolean
    projectTypes?: boolean
    preferredSkills?: boolean
    budgetRange?: boolean
    clientType?: boolean
    howDidYouHear?: boolean
    interestedCategories?: boolean
    urgencyLevel?: boolean
    preferredWorkingStyle?: boolean
    communicationPreference?: boolean
    projectDescription?: boolean
    paymentPreference?: boolean
    projectFrequency?: boolean
    averageProjectDuration?: boolean
    maxHourlyRate?: boolean
    totalMonthlyBudget?: boolean
    projectBasedRates?: boolean
    hoursPerWeek?: boolean
    workingHours?: boolean
    workingDays?: boolean
    minimumProjectBudget?: boolean
    specialRequirements?: boolean
    idDocument?: boolean
    addressProof?: boolean
    taxInformation?: boolean
    phoneVerified?: boolean
    jobsPosted?: boolean | User$jobsPostedArgs<ExtArgs>
    proposals?: boolean | User$proposalsArgs<ExtArgs>
    reviews?: boolean | User$reviewsArgs<ExtArgs>
    receivedReviews?: boolean | User$receivedReviewsArgs<ExtArgs>
    messages?: boolean | User$messagesArgs<ExtArgs>
    receivedMessages?: boolean | User$receivedMessagesArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    savedFreelancers?: boolean | User$savedFreelancersArgs<ExtArgs>
    savedByUsers?: boolean | User$savedByUsersArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    googleId?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    avatar?: boolean
    bio?: boolean
    location?: boolean
    phone?: boolean
    userType?: boolean
    isOnboarded?: boolean
    onboardingStep?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    country?: boolean
    city?: boolean
    timezone?: boolean
    title?: boolean
    overview?: boolean
    skills?: boolean
    topSkills?: boolean
    serviceOfferings?: boolean
    hourlyRate?: boolean
    portfolio?: boolean
    experience?: boolean
    education?: boolean
    workExperience?: boolean
    certifications?: boolean
    availability?: boolean
    languages?: boolean
    socialLinks?: boolean
    category?: boolean
    subcategory?: boolean
    experienceLevel?: boolean
    totalEarnings?: boolean
    successRate?: boolean
    completedJobs?: boolean
    onTime?: boolean
    onBudget?: boolean
    responseTime?: boolean
    lastActive?: boolean
    topRatedPlus?: boolean
    verified?: boolean
    risingTalent?: boolean
    portfolioItems?: boolean
    testScores?: boolean
    specializations?: boolean
    memberSince?: boolean
    profileStrength?: boolean
    repeatHireRate?: boolean
    rating?: boolean
    reviewCount?: boolean
    portfolioProjects?: boolean
    workHistory?: boolean
    employmentHistory?: boolean
    coverImage?: boolean
    isOnline?: boolean
    hourlyRateRange?: boolean
    availabilityStatus?: boolean
    companyName?: boolean
    companySize?: boolean
    industry?: boolean
    companyWebsite?: boolean
    companyDescription?: boolean
    projectTypes?: boolean
    preferredSkills?: boolean
    budgetRange?: boolean
    clientType?: boolean
    howDidYouHear?: boolean
    interestedCategories?: boolean
    urgencyLevel?: boolean
    preferredWorkingStyle?: boolean
    communicationPreference?: boolean
    projectDescription?: boolean
    paymentPreference?: boolean
    projectFrequency?: boolean
    averageProjectDuration?: boolean
    maxHourlyRate?: boolean
    totalMonthlyBudget?: boolean
    projectBasedRates?: boolean
    hoursPerWeek?: boolean
    workingHours?: boolean
    workingDays?: boolean
    minimumProjectBudget?: boolean
    specialRequirements?: boolean
    idDocument?: boolean
    addressProof?: boolean
    taxInformation?: boolean
    phoneVerified?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    googleId?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    avatar?: boolean
    bio?: boolean
    location?: boolean
    phone?: boolean
    userType?: boolean
    isOnboarded?: boolean
    onboardingStep?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    country?: boolean
    city?: boolean
    timezone?: boolean
    title?: boolean
    overview?: boolean
    skills?: boolean
    topSkills?: boolean
    serviceOfferings?: boolean
    hourlyRate?: boolean
    portfolio?: boolean
    experience?: boolean
    education?: boolean
    workExperience?: boolean
    certifications?: boolean
    availability?: boolean
    languages?: boolean
    socialLinks?: boolean
    category?: boolean
    subcategory?: boolean
    experienceLevel?: boolean
    totalEarnings?: boolean
    successRate?: boolean
    completedJobs?: boolean
    onTime?: boolean
    onBudget?: boolean
    responseTime?: boolean
    lastActive?: boolean
    topRatedPlus?: boolean
    verified?: boolean
    risingTalent?: boolean
    portfolioItems?: boolean
    testScores?: boolean
    specializations?: boolean
    memberSince?: boolean
    profileStrength?: boolean
    repeatHireRate?: boolean
    rating?: boolean
    reviewCount?: boolean
    portfolioProjects?: boolean
    workHistory?: boolean
    employmentHistory?: boolean
    coverImage?: boolean
    isOnline?: boolean
    hourlyRateRange?: boolean
    availabilityStatus?: boolean
    companyName?: boolean
    companySize?: boolean
    industry?: boolean
    companyWebsite?: boolean
    companyDescription?: boolean
    projectTypes?: boolean
    preferredSkills?: boolean
    budgetRange?: boolean
    clientType?: boolean
    howDidYouHear?: boolean
    interestedCategories?: boolean
    urgencyLevel?: boolean
    preferredWorkingStyle?: boolean
    communicationPreference?: boolean
    projectDescription?: boolean
    paymentPreference?: boolean
    projectFrequency?: boolean
    averageProjectDuration?: boolean
    maxHourlyRate?: boolean
    totalMonthlyBudget?: boolean
    projectBasedRates?: boolean
    hoursPerWeek?: boolean
    workingHours?: boolean
    workingDays?: boolean
    minimumProjectBudget?: boolean
    specialRequirements?: boolean
    idDocument?: boolean
    addressProof?: boolean
    taxInformation?: boolean
    phoneVerified?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    googleId?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    avatar?: boolean
    bio?: boolean
    location?: boolean
    phone?: boolean
    userType?: boolean
    isOnboarded?: boolean
    onboardingStep?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    country?: boolean
    city?: boolean
    timezone?: boolean
    title?: boolean
    overview?: boolean
    skills?: boolean
    topSkills?: boolean
    serviceOfferings?: boolean
    hourlyRate?: boolean
    portfolio?: boolean
    experience?: boolean
    education?: boolean
    workExperience?: boolean
    certifications?: boolean
    availability?: boolean
    languages?: boolean
    socialLinks?: boolean
    category?: boolean
    subcategory?: boolean
    experienceLevel?: boolean
    totalEarnings?: boolean
    successRate?: boolean
    completedJobs?: boolean
    onTime?: boolean
    onBudget?: boolean
    responseTime?: boolean
    lastActive?: boolean
    topRatedPlus?: boolean
    verified?: boolean
    risingTalent?: boolean
    portfolioItems?: boolean
    testScores?: boolean
    specializations?: boolean
    memberSince?: boolean
    profileStrength?: boolean
    repeatHireRate?: boolean
    rating?: boolean
    reviewCount?: boolean
    portfolioProjects?: boolean
    workHistory?: boolean
    employmentHistory?: boolean
    coverImage?: boolean
    isOnline?: boolean
    hourlyRateRange?: boolean
    availabilityStatus?: boolean
    companyName?: boolean
    companySize?: boolean
    industry?: boolean
    companyWebsite?: boolean
    companyDescription?: boolean
    projectTypes?: boolean
    preferredSkills?: boolean
    budgetRange?: boolean
    clientType?: boolean
    howDidYouHear?: boolean
    interestedCategories?: boolean
    urgencyLevel?: boolean
    preferredWorkingStyle?: boolean
    communicationPreference?: boolean
    projectDescription?: boolean
    paymentPreference?: boolean
    projectFrequency?: boolean
    averageProjectDuration?: boolean
    maxHourlyRate?: boolean
    totalMonthlyBudget?: boolean
    projectBasedRates?: boolean
    hoursPerWeek?: boolean
    workingHours?: boolean
    workingDays?: boolean
    minimumProjectBudget?: boolean
    specialRequirements?: boolean
    idDocument?: boolean
    addressProof?: boolean
    taxInformation?: boolean
    phoneVerified?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "firstName" | "lastName" | "avatar" | "bio" | "location" | "phone" | "userType" | "isOnboarded" | "onboardingStep" | "createdAt" | "updatedAt" | "country" | "city" | "timezone" | "title" | "overview" | "skills" | "topSkills" | "serviceOfferings" | "hourlyRate" | "portfolio" | "experience" | "education" | "workExperience" | "certifications" | "availability" | "languages" | "socialLinks" | "category" | "subcategory" | "experienceLevel" | "totalEarnings" | "successRate" | "completedJobs" | "onTime" | "onBudget" | "responseTime" | "lastActive" | "topRatedPlus" | "verified" | "risingTalent" | "portfolioItems" | "testScores" | "specializations" | "memberSince" | "profileStrength" | "repeatHireRate" | "rating" | "reviewCount" | "portfolioProjects" | "workHistory" | "employmentHistory" | "coverImage" | "isOnline" | "hourlyRateRange" | "availabilityStatus" | "companyName" | "companySize" | "industry" | "companyWebsite" | "companyDescription" | "projectTypes" | "preferredSkills" | "budgetRange" | "clientType" | "howDidYouHear" | "interestedCategories" | "urgencyLevel" | "preferredWorkingStyle" | "communicationPreference" | "projectDescription" | "paymentPreference" | "projectFrequency" | "averageProjectDuration" | "maxHourlyRate" | "totalMonthlyBudget" | "projectBasedRates" | "hoursPerWeek" | "workingHours" | "workingDays" | "minimumProjectBudget" | "specialRequirements" | "idDocument" | "addressProof" | "taxInformation" | "phoneVerified", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jobsPosted?: boolean | User$jobsPostedArgs<ExtArgs>
    proposals?: boolean | User$proposalsArgs<ExtArgs>
    reviews?: boolean | User$reviewsArgs<ExtArgs>
    receivedReviews?: boolean | User$receivedReviewsArgs<ExtArgs>
    messages?: boolean | User$messagesArgs<ExtArgs>
    receivedMessages?: boolean | User$receivedMessagesArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    savedFreelancers?: boolean | User$savedFreelancersArgs<ExtArgs>
    savedByUsers?: boolean | User$savedByUsersArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      jobsPosted: Prisma.$JobPayload<ExtArgs>[]
      proposals: Prisma.$ProposalPayload<ExtArgs>[]
      reviews: Prisma.$ReviewPayload<ExtArgs>[]
      receivedReviews: Prisma.$ReviewPayload<ExtArgs>[]
      messages: Prisma.$MessagePayload<ExtArgs>[]
      receivedMessages: Prisma.$MessagePayload<ExtArgs>[]
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
      savedFreelancers: Prisma.$SavedFreelancerPayload<ExtArgs>[]
      savedByUsers: Prisma.$SavedFreelancerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      googleId: string | null
      email: string
      password: string
      firstName: string
      lastName: string
      avatar: string | null
      bio: string | null
      location: string | null
      phone: string | null
      userType: $Enums.UserType
      isOnboarded: boolean
      onboardingStep: number
      createdAt: Date
      updatedAt: Date
      country: string | null
      city: string | null
      timezone: string | null
      title: string | null
      overview: string | null
      skills: Prisma.JsonValue | null
      topSkills: string[]
      serviceOfferings: string[]
      hourlyRate: number | null
      portfolio: string | null
      experience: string | null
      education: Prisma.JsonValue | null
      workExperience: Prisma.JsonValue | null
      certifications: string[]
      availability: string | null
      languages: Prisma.JsonValue | null
      socialLinks: Prisma.JsonValue | null
      category: string | null
      subcategory: string | null
      experienceLevel: string | null
      totalEarnings: string | null
      successRate: number | null
      completedJobs: number | null
      onTime: number | null
      onBudget: number | null
      responseTime: string | null
      lastActive: string | null
      topRatedPlus: boolean
      verified: boolean
      risingTalent: boolean
      portfolioItems: Prisma.JsonValue | null
      testScores: Prisma.JsonValue | null
      specializations: string[]
      memberSince: string | null
      profileStrength: number | null
      repeatHireRate: number | null
      rating: number | null
      reviewCount: number | null
      portfolioProjects: Prisma.JsonValue | null
      workHistory: Prisma.JsonValue | null
      employmentHistory: Prisma.JsonValue | null
      coverImage: string | null
      isOnline: boolean
      hourlyRateRange: string | null
      availabilityStatus: string | null
      companyName: string | null
      companySize: string | null
      industry: string | null
      companyWebsite: string | null
      companyDescription: string | null
      projectTypes: string[]
      preferredSkills: string[]
      budgetRange: string | null
      clientType: string | null
      howDidYouHear: string | null
      interestedCategories: string[]
      urgencyLevel: string | null
      preferredWorkingStyle: string | null
      communicationPreference: string[]
      projectDescription: string | null
      paymentPreference: string | null
      projectFrequency: string | null
      averageProjectDuration: string | null
      maxHourlyRate: string | null
      totalMonthlyBudget: string | null
      projectBasedRates: Prisma.JsonValue | null
      hoursPerWeek: string | null
      workingHours: Prisma.JsonValue | null
      workingDays: string[]
      minimumProjectBudget: string | null
      specialRequirements: string | null
      idDocument: string | null
      addressProof: string | null
      taxInformation: string | null
      phoneVerified: boolean
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    jobsPosted<T extends User$jobsPostedArgs<ExtArgs> = {}>(args?: Subset<T, User$jobsPostedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    proposals<T extends User$proposalsArgs<ExtArgs> = {}>(args?: Subset<T, User$proposalsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProposalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reviews<T extends User$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, User$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    receivedReviews<T extends User$receivedReviewsArgs<ExtArgs> = {}>(args?: Subset<T, User$receivedReviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    messages<T extends User$messagesArgs<ExtArgs> = {}>(args?: Subset<T, User$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    receivedMessages<T extends User$receivedMessagesArgs<ExtArgs> = {}>(args?: Subset<T, User$receivedMessagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notifications<T extends User$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, User$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    savedFreelancers<T extends User$savedFreelancersArgs<ExtArgs> = {}>(args?: Subset<T, User$savedFreelancersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedFreelancerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    savedByUsers<T extends User$savedByUsersArgs<ExtArgs> = {}>(args?: Subset<T, User$savedByUsersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedFreelancerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly googleId: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly avatar: FieldRef<"User", 'String'>
    readonly bio: FieldRef<"User", 'String'>
    readonly location: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly userType: FieldRef<"User", 'UserType'>
    readonly isOnboarded: FieldRef<"User", 'Boolean'>
    readonly onboardingStep: FieldRef<"User", 'Int'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly country: FieldRef<"User", 'String'>
    readonly city: FieldRef<"User", 'String'>
    readonly timezone: FieldRef<"User", 'String'>
    readonly title: FieldRef<"User", 'String'>
    readonly overview: FieldRef<"User", 'String'>
    readonly skills: FieldRef<"User", 'Json'>
    readonly topSkills: FieldRef<"User", 'String[]'>
    readonly serviceOfferings: FieldRef<"User", 'String[]'>
    readonly hourlyRate: FieldRef<"User", 'Float'>
    readonly portfolio: FieldRef<"User", 'String'>
    readonly experience: FieldRef<"User", 'String'>
    readonly education: FieldRef<"User", 'Json'>
    readonly workExperience: FieldRef<"User", 'Json'>
    readonly certifications: FieldRef<"User", 'String[]'>
    readonly availability: FieldRef<"User", 'String'>
    readonly languages: FieldRef<"User", 'Json'>
    readonly socialLinks: FieldRef<"User", 'Json'>
    readonly category: FieldRef<"User", 'String'>
    readonly subcategory: FieldRef<"User", 'String'>
    readonly experienceLevel: FieldRef<"User", 'String'>
    readonly totalEarnings: FieldRef<"User", 'String'>
    readonly successRate: FieldRef<"User", 'Int'>
    readonly completedJobs: FieldRef<"User", 'Int'>
    readonly onTime: FieldRef<"User", 'Int'>
    readonly onBudget: FieldRef<"User", 'Int'>
    readonly responseTime: FieldRef<"User", 'String'>
    readonly lastActive: FieldRef<"User", 'String'>
    readonly topRatedPlus: FieldRef<"User", 'Boolean'>
    readonly verified: FieldRef<"User", 'Boolean'>
    readonly risingTalent: FieldRef<"User", 'Boolean'>
    readonly portfolioItems: FieldRef<"User", 'Json'>
    readonly testScores: FieldRef<"User", 'Json'>
    readonly specializations: FieldRef<"User", 'String[]'>
    readonly memberSince: FieldRef<"User", 'String'>
    readonly profileStrength: FieldRef<"User", 'Int'>
    readonly repeatHireRate: FieldRef<"User", 'Int'>
    readonly rating: FieldRef<"User", 'Float'>
    readonly reviewCount: FieldRef<"User", 'Int'>
    readonly portfolioProjects: FieldRef<"User", 'Json'>
    readonly workHistory: FieldRef<"User", 'Json'>
    readonly employmentHistory: FieldRef<"User", 'Json'>
    readonly coverImage: FieldRef<"User", 'String'>
    readonly isOnline: FieldRef<"User", 'Boolean'>
    readonly hourlyRateRange: FieldRef<"User", 'String'>
    readonly availabilityStatus: FieldRef<"User", 'String'>
    readonly companyName: FieldRef<"User", 'String'>
    readonly companySize: FieldRef<"User", 'String'>
    readonly industry: FieldRef<"User", 'String'>
    readonly companyWebsite: FieldRef<"User", 'String'>
    readonly companyDescription: FieldRef<"User", 'String'>
    readonly projectTypes: FieldRef<"User", 'String[]'>
    readonly preferredSkills: FieldRef<"User", 'String[]'>
    readonly budgetRange: FieldRef<"User", 'String'>
    readonly clientType: FieldRef<"User", 'String'>
    readonly howDidYouHear: FieldRef<"User", 'String'>
    readonly interestedCategories: FieldRef<"User", 'String[]'>
    readonly urgencyLevel: FieldRef<"User", 'String'>
    readonly preferredWorkingStyle: FieldRef<"User", 'String'>
    readonly communicationPreference: FieldRef<"User", 'String[]'>
    readonly projectDescription: FieldRef<"User", 'String'>
    readonly paymentPreference: FieldRef<"User", 'String'>
    readonly projectFrequency: FieldRef<"User", 'String'>
    readonly averageProjectDuration: FieldRef<"User", 'String'>
    readonly maxHourlyRate: FieldRef<"User", 'String'>
    readonly totalMonthlyBudget: FieldRef<"User", 'String'>
    readonly projectBasedRates: FieldRef<"User", 'Json'>
    readonly hoursPerWeek: FieldRef<"User", 'String'>
    readonly workingHours: FieldRef<"User", 'Json'>
    readonly workingDays: FieldRef<"User", 'String[]'>
    readonly minimumProjectBudget: FieldRef<"User", 'String'>
    readonly specialRequirements: FieldRef<"User", 'String'>
    readonly idDocument: FieldRef<"User", 'String'>
    readonly addressProof: FieldRef<"User", 'String'>
    readonly taxInformation: FieldRef<"User", 'String'>
    readonly phoneVerified: FieldRef<"User", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.jobsPosted
   */
  export type User$jobsPostedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    where?: JobWhereInput
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    cursor?: JobWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * User.proposals
   */
  export type User$proposalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proposal
     */
    select?: ProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proposal
     */
    omit?: ProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposalInclude<ExtArgs> | null
    where?: ProposalWhereInput
    orderBy?: ProposalOrderByWithRelationInput | ProposalOrderByWithRelationInput[]
    cursor?: ProposalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProposalScalarFieldEnum | ProposalScalarFieldEnum[]
  }

  /**
   * User.reviews
   */
  export type User$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * User.receivedReviews
   */
  export type User$receivedReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * User.messages
   */
  export type User$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * User.receivedMessages
   */
  export type User$receivedMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * User.notifications
   */
  export type User$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * User.savedFreelancers
   */
  export type User$savedFreelancersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedFreelancer
     */
    select?: SavedFreelancerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedFreelancer
     */
    omit?: SavedFreelancerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedFreelancerInclude<ExtArgs> | null
    where?: SavedFreelancerWhereInput
    orderBy?: SavedFreelancerOrderByWithRelationInput | SavedFreelancerOrderByWithRelationInput[]
    cursor?: SavedFreelancerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SavedFreelancerScalarFieldEnum | SavedFreelancerScalarFieldEnum[]
  }

  /**
   * User.savedByUsers
   */
  export type User$savedByUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedFreelancer
     */
    select?: SavedFreelancerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedFreelancer
     */
    omit?: SavedFreelancerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedFreelancerInclude<ExtArgs> | null
    where?: SavedFreelancerWhereInput
    orderBy?: SavedFreelancerOrderByWithRelationInput | SavedFreelancerOrderByWithRelationInput[]
    cursor?: SavedFreelancerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SavedFreelancerScalarFieldEnum | SavedFreelancerScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Job
   */

  export type AggregateJob = {
    _count: JobCountAggregateOutputType | null
    _avg: JobAvgAggregateOutputType | null
    _sum: JobSumAggregateOutputType | null
    _min: JobMinAggregateOutputType | null
    _max: JobMaxAggregateOutputType | null
  }

  export type JobAvgAggregateOutputType = {
    minBudget: number | null
    maxBudget: number | null
    hourlyRate: number | null
  }

  export type JobSumAggregateOutputType = {
    minBudget: number | null
    maxBudget: number | null
    hourlyRate: number | null
  }

  export type JobMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    budget: $Enums.BudgetType | null
    minBudget: number | null
    maxBudget: number | null
    hourlyRate: number | null
    duration: string | null
    category: string | null
    subcategory: string | null
    projectType: string | null
    experienceLevel: string | null
    workingHours: string | null
    timezone: string | null
    location: string | null
    isRemote: boolean | null
    status: $Enums.JobStatus | null
    isUrgent: boolean | null
    visibility: string | null
    applicationDeadline: Date | null
    clientId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JobMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    budget: $Enums.BudgetType | null
    minBudget: number | null
    maxBudget: number | null
    hourlyRate: number | null
    duration: string | null
    category: string | null
    subcategory: string | null
    projectType: string | null
    experienceLevel: string | null
    workingHours: string | null
    timezone: string | null
    location: string | null
    isRemote: boolean | null
    status: $Enums.JobStatus | null
    isUrgent: boolean | null
    visibility: string | null
    applicationDeadline: Date | null
    clientId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JobCountAggregateOutputType = {
    id: number
    title: number
    description: number
    requirements: number
    budget: number
    minBudget: number
    maxBudget: number
    hourlyRate: number
    duration: number
    skills: number
    category: number
    subcategory: number
    projectType: number
    experienceLevel: number
    workingHours: number
    timezone: number
    communicationPreferences: number
    location: number
    isRemote: number
    status: number
    isUrgent: number
    visibility: number
    applicationDeadline: number
    clientId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type JobAvgAggregateInputType = {
    minBudget?: true
    maxBudget?: true
    hourlyRate?: true
  }

  export type JobSumAggregateInputType = {
    minBudget?: true
    maxBudget?: true
    hourlyRate?: true
  }

  export type JobMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    budget?: true
    minBudget?: true
    maxBudget?: true
    hourlyRate?: true
    duration?: true
    category?: true
    subcategory?: true
    projectType?: true
    experienceLevel?: true
    workingHours?: true
    timezone?: true
    location?: true
    isRemote?: true
    status?: true
    isUrgent?: true
    visibility?: true
    applicationDeadline?: true
    clientId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JobMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    budget?: true
    minBudget?: true
    maxBudget?: true
    hourlyRate?: true
    duration?: true
    category?: true
    subcategory?: true
    projectType?: true
    experienceLevel?: true
    workingHours?: true
    timezone?: true
    location?: true
    isRemote?: true
    status?: true
    isUrgent?: true
    visibility?: true
    applicationDeadline?: true
    clientId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JobCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    requirements?: true
    budget?: true
    minBudget?: true
    maxBudget?: true
    hourlyRate?: true
    duration?: true
    skills?: true
    category?: true
    subcategory?: true
    projectType?: true
    experienceLevel?: true
    workingHours?: true
    timezone?: true
    communicationPreferences?: true
    location?: true
    isRemote?: true
    status?: true
    isUrgent?: true
    visibility?: true
    applicationDeadline?: true
    clientId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type JobAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Job to aggregate.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Jobs
    **/
    _count?: true | JobCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JobAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JobSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobMaxAggregateInputType
  }

  export type GetJobAggregateType<T extends JobAggregateArgs> = {
        [P in keyof T & keyof AggregateJob]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJob[P]>
      : GetScalarType<T[P], AggregateJob[P]>
  }




  export type JobGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobWhereInput
    orderBy?: JobOrderByWithAggregationInput | JobOrderByWithAggregationInput[]
    by: JobScalarFieldEnum[] | JobScalarFieldEnum
    having?: JobScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobCountAggregateInputType | true
    _avg?: JobAvgAggregateInputType
    _sum?: JobSumAggregateInputType
    _min?: JobMinAggregateInputType
    _max?: JobMaxAggregateInputType
  }

  export type JobGroupByOutputType = {
    id: string
    title: string
    description: string
    requirements: string[]
    budget: $Enums.BudgetType
    minBudget: number | null
    maxBudget: number | null
    hourlyRate: number | null
    duration: string | null
    skills: string[]
    category: string
    subcategory: string | null
    projectType: string | null
    experienceLevel: string | null
    workingHours: string | null
    timezone: string | null
    communicationPreferences: string[]
    location: string | null
    isRemote: boolean
    status: $Enums.JobStatus
    isUrgent: boolean
    visibility: string
    applicationDeadline: Date | null
    clientId: string
    createdAt: Date
    updatedAt: Date
    _count: JobCountAggregateOutputType | null
    _avg: JobAvgAggregateOutputType | null
    _sum: JobSumAggregateOutputType | null
    _min: JobMinAggregateOutputType | null
    _max: JobMaxAggregateOutputType | null
  }

  type GetJobGroupByPayload<T extends JobGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobGroupByOutputType[P]>
            : GetScalarType<T[P], JobGroupByOutputType[P]>
        }
      >
    >


  export type JobSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    requirements?: boolean
    budget?: boolean
    minBudget?: boolean
    maxBudget?: boolean
    hourlyRate?: boolean
    duration?: boolean
    skills?: boolean
    category?: boolean
    subcategory?: boolean
    projectType?: boolean
    experienceLevel?: boolean
    workingHours?: boolean
    timezone?: boolean
    communicationPreferences?: boolean
    location?: boolean
    isRemote?: boolean
    status?: boolean
    isUrgent?: boolean
    visibility?: boolean
    applicationDeadline?: boolean
    clientId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    conversation?: boolean | Job$conversationArgs<ExtArgs>
    client?: boolean | UserDefaultArgs<ExtArgs>
    proposals?: boolean | Job$proposalsArgs<ExtArgs>
    reviews?: boolean | Job$reviewsArgs<ExtArgs>
    _count?: boolean | JobCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["job"]>

  export type JobSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    requirements?: boolean
    budget?: boolean
    minBudget?: boolean
    maxBudget?: boolean
    hourlyRate?: boolean
    duration?: boolean
    skills?: boolean
    category?: boolean
    subcategory?: boolean
    projectType?: boolean
    experienceLevel?: boolean
    workingHours?: boolean
    timezone?: boolean
    communicationPreferences?: boolean
    location?: boolean
    isRemote?: boolean
    status?: boolean
    isUrgent?: boolean
    visibility?: boolean
    applicationDeadline?: boolean
    clientId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    client?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["job"]>

  export type JobSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    requirements?: boolean
    budget?: boolean
    minBudget?: boolean
    maxBudget?: boolean
    hourlyRate?: boolean
    duration?: boolean
    skills?: boolean
    category?: boolean
    subcategory?: boolean
    projectType?: boolean
    experienceLevel?: boolean
    workingHours?: boolean
    timezone?: boolean
    communicationPreferences?: boolean
    location?: boolean
    isRemote?: boolean
    status?: boolean
    isUrgent?: boolean
    visibility?: boolean
    applicationDeadline?: boolean
    clientId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    client?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["job"]>

  export type JobSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    requirements?: boolean
    budget?: boolean
    minBudget?: boolean
    maxBudget?: boolean
    hourlyRate?: boolean
    duration?: boolean
    skills?: boolean
    category?: boolean
    subcategory?: boolean
    projectType?: boolean
    experienceLevel?: boolean
    workingHours?: boolean
    timezone?: boolean
    communicationPreferences?: boolean
    location?: boolean
    isRemote?: boolean
    status?: boolean
    isUrgent?: boolean
    visibility?: boolean
    applicationDeadline?: boolean
    clientId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type JobOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "requirements" | "budget" | "minBudget" | "maxBudget" | "hourlyRate" | "duration" | "skills" | "category" | "subcategory" | "projectType" | "experienceLevel" | "workingHours" | "timezone" | "communicationPreferences" | "location" | "isRemote" | "status" | "isUrgent" | "visibility" | "applicationDeadline" | "clientId" | "createdAt" | "updatedAt", ExtArgs["result"]["job"]>
  export type JobInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | Job$conversationArgs<ExtArgs>
    client?: boolean | UserDefaultArgs<ExtArgs>
    proposals?: boolean | Job$proposalsArgs<ExtArgs>
    reviews?: boolean | Job$reviewsArgs<ExtArgs>
    _count?: boolean | JobCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type JobIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type JobIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $JobPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Job"
    objects: {
      conversation: Prisma.$ConversationPayload<ExtArgs>[]
      client: Prisma.$UserPayload<ExtArgs>
      proposals: Prisma.$ProposalPayload<ExtArgs>[]
      reviews: Prisma.$ReviewPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      requirements: string[]
      budget: $Enums.BudgetType
      minBudget: number | null
      maxBudget: number | null
      hourlyRate: number | null
      duration: string | null
      skills: string[]
      category: string
      subcategory: string | null
      projectType: string | null
      experienceLevel: string | null
      workingHours: string | null
      timezone: string | null
      communicationPreferences: string[]
      location: string | null
      isRemote: boolean
      status: $Enums.JobStatus
      isUrgent: boolean
      visibility: string
      applicationDeadline: Date | null
      clientId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["job"]>
    composites: {}
  }

  type JobGetPayload<S extends boolean | null | undefined | JobDefaultArgs> = $Result.GetResult<Prisma.$JobPayload, S>

  type JobCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JobFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JobCountAggregateInputType | true
    }

  export interface JobDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Job'], meta: { name: 'Job' } }
    /**
     * Find zero or one Job that matches the filter.
     * @param {JobFindUniqueArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JobFindUniqueArgs>(args: SelectSubset<T, JobFindUniqueArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Job that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JobFindUniqueOrThrowArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JobFindUniqueOrThrowArgs>(args: SelectSubset<T, JobFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Job that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindFirstArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JobFindFirstArgs>(args?: SelectSubset<T, JobFindFirstArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Job that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindFirstOrThrowArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JobFindFirstOrThrowArgs>(args?: SelectSubset<T, JobFindFirstOrThrowArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Jobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Jobs
     * const jobs = await prisma.job.findMany()
     * 
     * // Get first 10 Jobs
     * const jobs = await prisma.job.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jobWithIdOnly = await prisma.job.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JobFindManyArgs>(args?: SelectSubset<T, JobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Job.
     * @param {JobCreateArgs} args - Arguments to create a Job.
     * @example
     * // Create one Job
     * const Job = await prisma.job.create({
     *   data: {
     *     // ... data to create a Job
     *   }
     * })
     * 
     */
    create<T extends JobCreateArgs>(args: SelectSubset<T, JobCreateArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Jobs.
     * @param {JobCreateManyArgs} args - Arguments to create many Jobs.
     * @example
     * // Create many Jobs
     * const job = await prisma.job.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JobCreateManyArgs>(args?: SelectSubset<T, JobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Jobs and returns the data saved in the database.
     * @param {JobCreateManyAndReturnArgs} args - Arguments to create many Jobs.
     * @example
     * // Create many Jobs
     * const job = await prisma.job.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Jobs and only return the `id`
     * const jobWithIdOnly = await prisma.job.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JobCreateManyAndReturnArgs>(args?: SelectSubset<T, JobCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Job.
     * @param {JobDeleteArgs} args - Arguments to delete one Job.
     * @example
     * // Delete one Job
     * const Job = await prisma.job.delete({
     *   where: {
     *     // ... filter to delete one Job
     *   }
     * })
     * 
     */
    delete<T extends JobDeleteArgs>(args: SelectSubset<T, JobDeleteArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Job.
     * @param {JobUpdateArgs} args - Arguments to update one Job.
     * @example
     * // Update one Job
     * const job = await prisma.job.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JobUpdateArgs>(args: SelectSubset<T, JobUpdateArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Jobs.
     * @param {JobDeleteManyArgs} args - Arguments to filter Jobs to delete.
     * @example
     * // Delete a few Jobs
     * const { count } = await prisma.job.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JobDeleteManyArgs>(args?: SelectSubset<T, JobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Jobs
     * const job = await prisma.job.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JobUpdateManyArgs>(args: SelectSubset<T, JobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Jobs and returns the data updated in the database.
     * @param {JobUpdateManyAndReturnArgs} args - Arguments to update many Jobs.
     * @example
     * // Update many Jobs
     * const job = await prisma.job.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Jobs and only return the `id`
     * const jobWithIdOnly = await prisma.job.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends JobUpdateManyAndReturnArgs>(args: SelectSubset<T, JobUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Job.
     * @param {JobUpsertArgs} args - Arguments to update or create a Job.
     * @example
     * // Update or create a Job
     * const job = await prisma.job.upsert({
     *   create: {
     *     // ... data to create a Job
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Job we want to update
     *   }
     * })
     */
    upsert<T extends JobUpsertArgs>(args: SelectSubset<T, JobUpsertArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobCountArgs} args - Arguments to filter Jobs to count.
     * @example
     * // Count the number of Jobs
     * const count = await prisma.job.count({
     *   where: {
     *     // ... the filter for the Jobs we want to count
     *   }
     * })
    **/
    count<T extends JobCountArgs>(
      args?: Subset<T, JobCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Job.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JobAggregateArgs>(args: Subset<T, JobAggregateArgs>): Prisma.PrismaPromise<GetJobAggregateType<T>>

    /**
     * Group by Job.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JobGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobGroupByArgs['orderBy'] }
        : { orderBy?: JobGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Job model
   */
  readonly fields: JobFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Job.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JobClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    conversation<T extends Job$conversationArgs<ExtArgs> = {}>(args?: Subset<T, Job$conversationArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    client<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    proposals<T extends Job$proposalsArgs<ExtArgs> = {}>(args?: Subset<T, Job$proposalsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProposalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reviews<T extends Job$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, Job$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Job model
   */
  interface JobFieldRefs {
    readonly id: FieldRef<"Job", 'String'>
    readonly title: FieldRef<"Job", 'String'>
    readonly description: FieldRef<"Job", 'String'>
    readonly requirements: FieldRef<"Job", 'String[]'>
    readonly budget: FieldRef<"Job", 'BudgetType'>
    readonly minBudget: FieldRef<"Job", 'Float'>
    readonly maxBudget: FieldRef<"Job", 'Float'>
    readonly hourlyRate: FieldRef<"Job", 'Float'>
    readonly duration: FieldRef<"Job", 'String'>
    readonly skills: FieldRef<"Job", 'String[]'>
    readonly category: FieldRef<"Job", 'String'>
    readonly subcategory: FieldRef<"Job", 'String'>
    readonly projectType: FieldRef<"Job", 'String'>
    readonly experienceLevel: FieldRef<"Job", 'String'>
    readonly workingHours: FieldRef<"Job", 'String'>
    readonly timezone: FieldRef<"Job", 'String'>
    readonly communicationPreferences: FieldRef<"Job", 'String[]'>
    readonly location: FieldRef<"Job", 'String'>
    readonly isRemote: FieldRef<"Job", 'Boolean'>
    readonly status: FieldRef<"Job", 'JobStatus'>
    readonly isUrgent: FieldRef<"Job", 'Boolean'>
    readonly visibility: FieldRef<"Job", 'String'>
    readonly applicationDeadline: FieldRef<"Job", 'DateTime'>
    readonly clientId: FieldRef<"Job", 'String'>
    readonly createdAt: FieldRef<"Job", 'DateTime'>
    readonly updatedAt: FieldRef<"Job", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Job findUnique
   */
  export type JobFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job findUniqueOrThrow
   */
  export type JobFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job findFirst
   */
  export type JobFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jobs.
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jobs.
     */
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Job findFirstOrThrow
   */
  export type JobFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jobs.
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jobs.
     */
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Job findMany
   */
  export type JobFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Jobs to fetch.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Jobs.
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Job create
   */
  export type JobCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * The data needed to create a Job.
     */
    data: XOR<JobCreateInput, JobUncheckedCreateInput>
  }

  /**
   * Job createMany
   */
  export type JobCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Jobs.
     */
    data: JobCreateManyInput | JobCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Job createManyAndReturn
   */
  export type JobCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * The data used to create many Jobs.
     */
    data: JobCreateManyInput | JobCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Job update
   */
  export type JobUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * The data needed to update a Job.
     */
    data: XOR<JobUpdateInput, JobUncheckedUpdateInput>
    /**
     * Choose, which Job to update.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job updateMany
   */
  export type JobUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Jobs.
     */
    data: XOR<JobUpdateManyMutationInput, JobUncheckedUpdateManyInput>
    /**
     * Filter which Jobs to update
     */
    where?: JobWhereInput
    /**
     * Limit how many Jobs to update.
     */
    limit?: number
  }

  /**
   * Job updateManyAndReturn
   */
  export type JobUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * The data used to update Jobs.
     */
    data: XOR<JobUpdateManyMutationInput, JobUncheckedUpdateManyInput>
    /**
     * Filter which Jobs to update
     */
    where?: JobWhereInput
    /**
     * Limit how many Jobs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Job upsert
   */
  export type JobUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * The filter to search for the Job to update in case it exists.
     */
    where: JobWhereUniqueInput
    /**
     * In case the Job found by the `where` argument doesn't exist, create a new Job with this data.
     */
    create: XOR<JobCreateInput, JobUncheckedCreateInput>
    /**
     * In case the Job was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JobUpdateInput, JobUncheckedUpdateInput>
  }

  /**
   * Job delete
   */
  export type JobDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter which Job to delete.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job deleteMany
   */
  export type JobDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Jobs to delete
     */
    where?: JobWhereInput
    /**
     * Limit how many Jobs to delete.
     */
    limit?: number
  }

  /**
   * Job.conversation
   */
  export type Job$conversationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    where?: ConversationWhereInput
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    cursor?: ConversationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Job.proposals
   */
  export type Job$proposalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proposal
     */
    select?: ProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proposal
     */
    omit?: ProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposalInclude<ExtArgs> | null
    where?: ProposalWhereInput
    orderBy?: ProposalOrderByWithRelationInput | ProposalOrderByWithRelationInput[]
    cursor?: ProposalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProposalScalarFieldEnum | ProposalScalarFieldEnum[]
  }

  /**
   * Job.reviews
   */
  export type Job$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Job without action
   */
  export type JobDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
  }


  /**
   * Model Proposal
   */

  export type AggregateProposal = {
    _count: ProposalCountAggregateOutputType | null
    _avg: ProposalAvgAggregateOutputType | null
    _sum: ProposalSumAggregateOutputType | null
    _min: ProposalMinAggregateOutputType | null
    _max: ProposalMaxAggregateOutputType | null
  }

  export type ProposalAvgAggregateOutputType = {
    bidAmount: number | null
    rating: number | null
    originalBudget: number | null
  }

  export type ProposalSumAggregateOutputType = {
    bidAmount: number | null
    rating: number | null
    originalBudget: number | null
  }

  export type ProposalMinAggregateOutputType = {
    id: string | null
    coverLetter: string | null
    bidAmount: number | null
    estimatedDuration: string | null
    status: $Enums.ProposalStatus | null
    jobId: string | null
    freelancerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    clientNotes: string | null
    clientViewed: boolean | null
    rating: number | null
    originalBudget: number | null
    isShortlisted: boolean | null
  }

  export type ProposalMaxAggregateOutputType = {
    id: string | null
    coverLetter: string | null
    bidAmount: number | null
    estimatedDuration: string | null
    status: $Enums.ProposalStatus | null
    jobId: string | null
    freelancerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    clientNotes: string | null
    clientViewed: boolean | null
    rating: number | null
    originalBudget: number | null
    isShortlisted: boolean | null
  }

  export type ProposalCountAggregateOutputType = {
    id: number
    coverLetter: number
    bidAmount: number
    estimatedDuration: number
    attachments: number
    status: number
    jobId: number
    freelancerId: number
    createdAt: number
    updatedAt: number
    questionResponses: number
    milestones: number
    clientNotes: number
    clientViewed: number
    rating: number
    interview: number
    originalBudget: number
    isShortlisted: number
    _all: number
  }


  export type ProposalAvgAggregateInputType = {
    bidAmount?: true
    rating?: true
    originalBudget?: true
  }

  export type ProposalSumAggregateInputType = {
    bidAmount?: true
    rating?: true
    originalBudget?: true
  }

  export type ProposalMinAggregateInputType = {
    id?: true
    coverLetter?: true
    bidAmount?: true
    estimatedDuration?: true
    status?: true
    jobId?: true
    freelancerId?: true
    createdAt?: true
    updatedAt?: true
    clientNotes?: true
    clientViewed?: true
    rating?: true
    originalBudget?: true
    isShortlisted?: true
  }

  export type ProposalMaxAggregateInputType = {
    id?: true
    coverLetter?: true
    bidAmount?: true
    estimatedDuration?: true
    status?: true
    jobId?: true
    freelancerId?: true
    createdAt?: true
    updatedAt?: true
    clientNotes?: true
    clientViewed?: true
    rating?: true
    originalBudget?: true
    isShortlisted?: true
  }

  export type ProposalCountAggregateInputType = {
    id?: true
    coverLetter?: true
    bidAmount?: true
    estimatedDuration?: true
    attachments?: true
    status?: true
    jobId?: true
    freelancerId?: true
    createdAt?: true
    updatedAt?: true
    questionResponses?: true
    milestones?: true
    clientNotes?: true
    clientViewed?: true
    rating?: true
    interview?: true
    originalBudget?: true
    isShortlisted?: true
    _all?: true
  }

  export type ProposalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Proposal to aggregate.
     */
    where?: ProposalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Proposals to fetch.
     */
    orderBy?: ProposalOrderByWithRelationInput | ProposalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProposalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Proposals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Proposals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Proposals
    **/
    _count?: true | ProposalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProposalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProposalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProposalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProposalMaxAggregateInputType
  }

  export type GetProposalAggregateType<T extends ProposalAggregateArgs> = {
        [P in keyof T & keyof AggregateProposal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProposal[P]>
      : GetScalarType<T[P], AggregateProposal[P]>
  }




  export type ProposalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProposalWhereInput
    orderBy?: ProposalOrderByWithAggregationInput | ProposalOrderByWithAggregationInput[]
    by: ProposalScalarFieldEnum[] | ProposalScalarFieldEnum
    having?: ProposalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProposalCountAggregateInputType | true
    _avg?: ProposalAvgAggregateInputType
    _sum?: ProposalSumAggregateInputType
    _min?: ProposalMinAggregateInputType
    _max?: ProposalMaxAggregateInputType
  }

  export type ProposalGroupByOutputType = {
    id: string
    coverLetter: string
    bidAmount: number
    estimatedDuration: string
    attachments: string[]
    status: $Enums.ProposalStatus
    jobId: string
    freelancerId: string
    createdAt: Date
    updatedAt: Date
    questionResponses: JsonValue | null
    milestones: JsonValue | null
    clientNotes: string | null
    clientViewed: boolean
    rating: number | null
    interview: JsonValue | null
    originalBudget: number | null
    isShortlisted: boolean
    _count: ProposalCountAggregateOutputType | null
    _avg: ProposalAvgAggregateOutputType | null
    _sum: ProposalSumAggregateOutputType | null
    _min: ProposalMinAggregateOutputType | null
    _max: ProposalMaxAggregateOutputType | null
  }

  type GetProposalGroupByPayload<T extends ProposalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProposalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProposalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProposalGroupByOutputType[P]>
            : GetScalarType<T[P], ProposalGroupByOutputType[P]>
        }
      >
    >


  export type ProposalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    coverLetter?: boolean
    bidAmount?: boolean
    estimatedDuration?: boolean
    attachments?: boolean
    status?: boolean
    jobId?: boolean
    freelancerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    questionResponses?: boolean
    milestones?: boolean
    clientNotes?: boolean
    clientViewed?: boolean
    rating?: boolean
    interview?: boolean
    originalBudget?: boolean
    isShortlisted?: boolean
    job?: boolean | JobDefaultArgs<ExtArgs>
    freelancer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["proposal"]>

  export type ProposalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    coverLetter?: boolean
    bidAmount?: boolean
    estimatedDuration?: boolean
    attachments?: boolean
    status?: boolean
    jobId?: boolean
    freelancerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    questionResponses?: boolean
    milestones?: boolean
    clientNotes?: boolean
    clientViewed?: boolean
    rating?: boolean
    interview?: boolean
    originalBudget?: boolean
    isShortlisted?: boolean
    job?: boolean | JobDefaultArgs<ExtArgs>
    freelancer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["proposal"]>

  export type ProposalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    coverLetter?: boolean
    bidAmount?: boolean
    estimatedDuration?: boolean
    attachments?: boolean
    status?: boolean
    jobId?: boolean
    freelancerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    questionResponses?: boolean
    milestones?: boolean
    clientNotes?: boolean
    clientViewed?: boolean
    rating?: boolean
    interview?: boolean
    originalBudget?: boolean
    isShortlisted?: boolean
    job?: boolean | JobDefaultArgs<ExtArgs>
    freelancer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["proposal"]>

  export type ProposalSelectScalar = {
    id?: boolean
    coverLetter?: boolean
    bidAmount?: boolean
    estimatedDuration?: boolean
    attachments?: boolean
    status?: boolean
    jobId?: boolean
    freelancerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    questionResponses?: boolean
    milestones?: boolean
    clientNotes?: boolean
    clientViewed?: boolean
    rating?: boolean
    interview?: boolean
    originalBudget?: boolean
    isShortlisted?: boolean
  }

  export type ProposalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "coverLetter" | "bidAmount" | "estimatedDuration" | "attachments" | "status" | "jobId" | "freelancerId" | "createdAt" | "updatedAt" | "questionResponses" | "milestones" | "clientNotes" | "clientViewed" | "rating" | "interview" | "originalBudget" | "isShortlisted", ExtArgs["result"]["proposal"]>
  export type ProposalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | JobDefaultArgs<ExtArgs>
    freelancer?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProposalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | JobDefaultArgs<ExtArgs>
    freelancer?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProposalIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | JobDefaultArgs<ExtArgs>
    freelancer?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProposalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Proposal"
    objects: {
      job: Prisma.$JobPayload<ExtArgs>
      freelancer: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      coverLetter: string
      bidAmount: number
      estimatedDuration: string
      attachments: string[]
      status: $Enums.ProposalStatus
      jobId: string
      freelancerId: string
      createdAt: Date
      updatedAt: Date
      questionResponses: Prisma.JsonValue | null
      milestones: Prisma.JsonValue | null
      clientNotes: string | null
      clientViewed: boolean
      rating: number | null
      interview: Prisma.JsonValue | null
      originalBudget: number | null
      isShortlisted: boolean
    }, ExtArgs["result"]["proposal"]>
    composites: {}
  }

  type ProposalGetPayload<S extends boolean | null | undefined | ProposalDefaultArgs> = $Result.GetResult<Prisma.$ProposalPayload, S>

  type ProposalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProposalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProposalCountAggregateInputType | true
    }

  export interface ProposalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Proposal'], meta: { name: 'Proposal' } }
    /**
     * Find zero or one Proposal that matches the filter.
     * @param {ProposalFindUniqueArgs} args - Arguments to find a Proposal
     * @example
     * // Get one Proposal
     * const proposal = await prisma.proposal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProposalFindUniqueArgs>(args: SelectSubset<T, ProposalFindUniqueArgs<ExtArgs>>): Prisma__ProposalClient<$Result.GetResult<Prisma.$ProposalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Proposal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProposalFindUniqueOrThrowArgs} args - Arguments to find a Proposal
     * @example
     * // Get one Proposal
     * const proposal = await prisma.proposal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProposalFindUniqueOrThrowArgs>(args: SelectSubset<T, ProposalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProposalClient<$Result.GetResult<Prisma.$ProposalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Proposal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProposalFindFirstArgs} args - Arguments to find a Proposal
     * @example
     * // Get one Proposal
     * const proposal = await prisma.proposal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProposalFindFirstArgs>(args?: SelectSubset<T, ProposalFindFirstArgs<ExtArgs>>): Prisma__ProposalClient<$Result.GetResult<Prisma.$ProposalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Proposal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProposalFindFirstOrThrowArgs} args - Arguments to find a Proposal
     * @example
     * // Get one Proposal
     * const proposal = await prisma.proposal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProposalFindFirstOrThrowArgs>(args?: SelectSubset<T, ProposalFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProposalClient<$Result.GetResult<Prisma.$ProposalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Proposals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProposalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Proposals
     * const proposals = await prisma.proposal.findMany()
     * 
     * // Get first 10 Proposals
     * const proposals = await prisma.proposal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const proposalWithIdOnly = await prisma.proposal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProposalFindManyArgs>(args?: SelectSubset<T, ProposalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProposalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Proposal.
     * @param {ProposalCreateArgs} args - Arguments to create a Proposal.
     * @example
     * // Create one Proposal
     * const Proposal = await prisma.proposal.create({
     *   data: {
     *     // ... data to create a Proposal
     *   }
     * })
     * 
     */
    create<T extends ProposalCreateArgs>(args: SelectSubset<T, ProposalCreateArgs<ExtArgs>>): Prisma__ProposalClient<$Result.GetResult<Prisma.$ProposalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Proposals.
     * @param {ProposalCreateManyArgs} args - Arguments to create many Proposals.
     * @example
     * // Create many Proposals
     * const proposal = await prisma.proposal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProposalCreateManyArgs>(args?: SelectSubset<T, ProposalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Proposals and returns the data saved in the database.
     * @param {ProposalCreateManyAndReturnArgs} args - Arguments to create many Proposals.
     * @example
     * // Create many Proposals
     * const proposal = await prisma.proposal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Proposals and only return the `id`
     * const proposalWithIdOnly = await prisma.proposal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProposalCreateManyAndReturnArgs>(args?: SelectSubset<T, ProposalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProposalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Proposal.
     * @param {ProposalDeleteArgs} args - Arguments to delete one Proposal.
     * @example
     * // Delete one Proposal
     * const Proposal = await prisma.proposal.delete({
     *   where: {
     *     // ... filter to delete one Proposal
     *   }
     * })
     * 
     */
    delete<T extends ProposalDeleteArgs>(args: SelectSubset<T, ProposalDeleteArgs<ExtArgs>>): Prisma__ProposalClient<$Result.GetResult<Prisma.$ProposalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Proposal.
     * @param {ProposalUpdateArgs} args - Arguments to update one Proposal.
     * @example
     * // Update one Proposal
     * const proposal = await prisma.proposal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProposalUpdateArgs>(args: SelectSubset<T, ProposalUpdateArgs<ExtArgs>>): Prisma__ProposalClient<$Result.GetResult<Prisma.$ProposalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Proposals.
     * @param {ProposalDeleteManyArgs} args - Arguments to filter Proposals to delete.
     * @example
     * // Delete a few Proposals
     * const { count } = await prisma.proposal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProposalDeleteManyArgs>(args?: SelectSubset<T, ProposalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Proposals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProposalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Proposals
     * const proposal = await prisma.proposal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProposalUpdateManyArgs>(args: SelectSubset<T, ProposalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Proposals and returns the data updated in the database.
     * @param {ProposalUpdateManyAndReturnArgs} args - Arguments to update many Proposals.
     * @example
     * // Update many Proposals
     * const proposal = await prisma.proposal.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Proposals and only return the `id`
     * const proposalWithIdOnly = await prisma.proposal.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProposalUpdateManyAndReturnArgs>(args: SelectSubset<T, ProposalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProposalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Proposal.
     * @param {ProposalUpsertArgs} args - Arguments to update or create a Proposal.
     * @example
     * // Update or create a Proposal
     * const proposal = await prisma.proposal.upsert({
     *   create: {
     *     // ... data to create a Proposal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Proposal we want to update
     *   }
     * })
     */
    upsert<T extends ProposalUpsertArgs>(args: SelectSubset<T, ProposalUpsertArgs<ExtArgs>>): Prisma__ProposalClient<$Result.GetResult<Prisma.$ProposalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Proposals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProposalCountArgs} args - Arguments to filter Proposals to count.
     * @example
     * // Count the number of Proposals
     * const count = await prisma.proposal.count({
     *   where: {
     *     // ... the filter for the Proposals we want to count
     *   }
     * })
    **/
    count<T extends ProposalCountArgs>(
      args?: Subset<T, ProposalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProposalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Proposal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProposalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProposalAggregateArgs>(args: Subset<T, ProposalAggregateArgs>): Prisma.PrismaPromise<GetProposalAggregateType<T>>

    /**
     * Group by Proposal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProposalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProposalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProposalGroupByArgs['orderBy'] }
        : { orderBy?: ProposalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProposalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProposalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Proposal model
   */
  readonly fields: ProposalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Proposal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProposalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    job<T extends JobDefaultArgs<ExtArgs> = {}>(args?: Subset<T, JobDefaultArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    freelancer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Proposal model
   */
  interface ProposalFieldRefs {
    readonly id: FieldRef<"Proposal", 'String'>
    readonly coverLetter: FieldRef<"Proposal", 'String'>
    readonly bidAmount: FieldRef<"Proposal", 'Float'>
    readonly estimatedDuration: FieldRef<"Proposal", 'String'>
    readonly attachments: FieldRef<"Proposal", 'String[]'>
    readonly status: FieldRef<"Proposal", 'ProposalStatus'>
    readonly jobId: FieldRef<"Proposal", 'String'>
    readonly freelancerId: FieldRef<"Proposal", 'String'>
    readonly createdAt: FieldRef<"Proposal", 'DateTime'>
    readonly updatedAt: FieldRef<"Proposal", 'DateTime'>
    readonly questionResponses: FieldRef<"Proposal", 'Json'>
    readonly milestones: FieldRef<"Proposal", 'Json'>
    readonly clientNotes: FieldRef<"Proposal", 'String'>
    readonly clientViewed: FieldRef<"Proposal", 'Boolean'>
    readonly rating: FieldRef<"Proposal", 'Int'>
    readonly interview: FieldRef<"Proposal", 'Json'>
    readonly originalBudget: FieldRef<"Proposal", 'Float'>
    readonly isShortlisted: FieldRef<"Proposal", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Proposal findUnique
   */
  export type ProposalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proposal
     */
    select?: ProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proposal
     */
    omit?: ProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposalInclude<ExtArgs> | null
    /**
     * Filter, which Proposal to fetch.
     */
    where: ProposalWhereUniqueInput
  }

  /**
   * Proposal findUniqueOrThrow
   */
  export type ProposalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proposal
     */
    select?: ProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proposal
     */
    omit?: ProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposalInclude<ExtArgs> | null
    /**
     * Filter, which Proposal to fetch.
     */
    where: ProposalWhereUniqueInput
  }

  /**
   * Proposal findFirst
   */
  export type ProposalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proposal
     */
    select?: ProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proposal
     */
    omit?: ProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposalInclude<ExtArgs> | null
    /**
     * Filter, which Proposal to fetch.
     */
    where?: ProposalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Proposals to fetch.
     */
    orderBy?: ProposalOrderByWithRelationInput | ProposalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Proposals.
     */
    cursor?: ProposalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Proposals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Proposals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Proposals.
     */
    distinct?: ProposalScalarFieldEnum | ProposalScalarFieldEnum[]
  }

  /**
   * Proposal findFirstOrThrow
   */
  export type ProposalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proposal
     */
    select?: ProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proposal
     */
    omit?: ProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposalInclude<ExtArgs> | null
    /**
     * Filter, which Proposal to fetch.
     */
    where?: ProposalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Proposals to fetch.
     */
    orderBy?: ProposalOrderByWithRelationInput | ProposalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Proposals.
     */
    cursor?: ProposalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Proposals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Proposals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Proposals.
     */
    distinct?: ProposalScalarFieldEnum | ProposalScalarFieldEnum[]
  }

  /**
   * Proposal findMany
   */
  export type ProposalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proposal
     */
    select?: ProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proposal
     */
    omit?: ProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposalInclude<ExtArgs> | null
    /**
     * Filter, which Proposals to fetch.
     */
    where?: ProposalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Proposals to fetch.
     */
    orderBy?: ProposalOrderByWithRelationInput | ProposalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Proposals.
     */
    cursor?: ProposalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Proposals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Proposals.
     */
    skip?: number
    distinct?: ProposalScalarFieldEnum | ProposalScalarFieldEnum[]
  }

  /**
   * Proposal create
   */
  export type ProposalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proposal
     */
    select?: ProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proposal
     */
    omit?: ProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposalInclude<ExtArgs> | null
    /**
     * The data needed to create a Proposal.
     */
    data: XOR<ProposalCreateInput, ProposalUncheckedCreateInput>
  }

  /**
   * Proposal createMany
   */
  export type ProposalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Proposals.
     */
    data: ProposalCreateManyInput | ProposalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Proposal createManyAndReturn
   */
  export type ProposalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proposal
     */
    select?: ProposalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Proposal
     */
    omit?: ProposalOmit<ExtArgs> | null
    /**
     * The data used to create many Proposals.
     */
    data: ProposalCreateManyInput | ProposalCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposalIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Proposal update
   */
  export type ProposalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proposal
     */
    select?: ProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proposal
     */
    omit?: ProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposalInclude<ExtArgs> | null
    /**
     * The data needed to update a Proposal.
     */
    data: XOR<ProposalUpdateInput, ProposalUncheckedUpdateInput>
    /**
     * Choose, which Proposal to update.
     */
    where: ProposalWhereUniqueInput
  }

  /**
   * Proposal updateMany
   */
  export type ProposalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Proposals.
     */
    data: XOR<ProposalUpdateManyMutationInput, ProposalUncheckedUpdateManyInput>
    /**
     * Filter which Proposals to update
     */
    where?: ProposalWhereInput
    /**
     * Limit how many Proposals to update.
     */
    limit?: number
  }

  /**
   * Proposal updateManyAndReturn
   */
  export type ProposalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proposal
     */
    select?: ProposalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Proposal
     */
    omit?: ProposalOmit<ExtArgs> | null
    /**
     * The data used to update Proposals.
     */
    data: XOR<ProposalUpdateManyMutationInput, ProposalUncheckedUpdateManyInput>
    /**
     * Filter which Proposals to update
     */
    where?: ProposalWhereInput
    /**
     * Limit how many Proposals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposalIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Proposal upsert
   */
  export type ProposalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proposal
     */
    select?: ProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proposal
     */
    omit?: ProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposalInclude<ExtArgs> | null
    /**
     * The filter to search for the Proposal to update in case it exists.
     */
    where: ProposalWhereUniqueInput
    /**
     * In case the Proposal found by the `where` argument doesn't exist, create a new Proposal with this data.
     */
    create: XOR<ProposalCreateInput, ProposalUncheckedCreateInput>
    /**
     * In case the Proposal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProposalUpdateInput, ProposalUncheckedUpdateInput>
  }

  /**
   * Proposal delete
   */
  export type ProposalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proposal
     */
    select?: ProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proposal
     */
    omit?: ProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposalInclude<ExtArgs> | null
    /**
     * Filter which Proposal to delete.
     */
    where: ProposalWhereUniqueInput
  }

  /**
   * Proposal deleteMany
   */
  export type ProposalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Proposals to delete
     */
    where?: ProposalWhereInput
    /**
     * Limit how many Proposals to delete.
     */
    limit?: number
  }

  /**
   * Proposal without action
   */
  export type ProposalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proposal
     */
    select?: ProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proposal
     */
    omit?: ProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposalInclude<ExtArgs> | null
  }


  /**
   * Model Review
   */

  export type AggregateReview = {
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  export type ReviewAvgAggregateOutputType = {
    rating: number | null
  }

  export type ReviewSumAggregateOutputType = {
    rating: number | null
  }

  export type ReviewMinAggregateOutputType = {
    id: string | null
    rating: number | null
    comment: string | null
    authorId: string | null
    receiverId: string | null
    jobId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReviewMaxAggregateOutputType = {
    id: string | null
    rating: number | null
    comment: string | null
    authorId: string | null
    receiverId: string | null
    jobId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReviewCountAggregateOutputType = {
    id: number
    rating: number
    comment: number
    authorId: number
    receiverId: number
    jobId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ReviewAvgAggregateInputType = {
    rating?: true
  }

  export type ReviewSumAggregateInputType = {
    rating?: true
  }

  export type ReviewMinAggregateInputType = {
    id?: true
    rating?: true
    comment?: true
    authorId?: true
    receiverId?: true
    jobId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReviewMaxAggregateInputType = {
    id?: true
    rating?: true
    comment?: true
    authorId?: true
    receiverId?: true
    jobId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReviewCountAggregateInputType = {
    id?: true
    rating?: true
    comment?: true
    authorId?: true
    receiverId?: true
    jobId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ReviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Review to aggregate.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reviews
    **/
    _count?: true | ReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReviewMaxAggregateInputType
  }

  export type GetReviewAggregateType<T extends ReviewAggregateArgs> = {
        [P in keyof T & keyof AggregateReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReview[P]>
      : GetScalarType<T[P], AggregateReview[P]>
  }




  export type ReviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithAggregationInput | ReviewOrderByWithAggregationInput[]
    by: ReviewScalarFieldEnum[] | ReviewScalarFieldEnum
    having?: ReviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReviewCountAggregateInputType | true
    _avg?: ReviewAvgAggregateInputType
    _sum?: ReviewSumAggregateInputType
    _min?: ReviewMinAggregateInputType
    _max?: ReviewMaxAggregateInputType
  }

  export type ReviewGroupByOutputType = {
    id: string
    rating: number
    comment: string
    authorId: string
    receiverId: string
    jobId: string | null
    createdAt: Date
    updatedAt: Date
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  type GetReviewGroupByPayload<T extends ReviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReviewGroupByOutputType[P]>
            : GetScalarType<T[P], ReviewGroupByOutputType[P]>
        }
      >
    >


  export type ReviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rating?: boolean
    comment?: boolean
    authorId?: boolean
    receiverId?: boolean
    jobId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
    job?: boolean | Review$jobArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rating?: boolean
    comment?: boolean
    authorId?: boolean
    receiverId?: boolean
    jobId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
    job?: boolean | Review$jobArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rating?: boolean
    comment?: boolean
    authorId?: boolean
    receiverId?: boolean
    jobId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
    job?: boolean | Review$jobArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectScalar = {
    id?: boolean
    rating?: boolean
    comment?: boolean
    authorId?: boolean
    receiverId?: boolean
    jobId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ReviewOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "rating" | "comment" | "authorId" | "receiverId" | "jobId" | "createdAt" | "updatedAt", ExtArgs["result"]["review"]>
  export type ReviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
    job?: boolean | Review$jobArgs<ExtArgs>
  }
  export type ReviewIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
    job?: boolean | Review$jobArgs<ExtArgs>
  }
  export type ReviewIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
    job?: boolean | Review$jobArgs<ExtArgs>
  }

  export type $ReviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Review"
    objects: {
      author: Prisma.$UserPayload<ExtArgs>
      receiver: Prisma.$UserPayload<ExtArgs>
      job: Prisma.$JobPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      rating: number
      comment: string
      authorId: string
      receiverId: string
      jobId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["review"]>
    composites: {}
  }

  type ReviewGetPayload<S extends boolean | null | undefined | ReviewDefaultArgs> = $Result.GetResult<Prisma.$ReviewPayload, S>

  type ReviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReviewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReviewCountAggregateInputType | true
    }

  export interface ReviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Review'], meta: { name: 'Review' } }
    /**
     * Find zero or one Review that matches the filter.
     * @param {ReviewFindUniqueArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReviewFindUniqueArgs>(args: SelectSubset<T, ReviewFindUniqueArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Review that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReviewFindUniqueOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReviewFindUniqueOrThrowArgs>(args: SelectSubset<T, ReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Review that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReviewFindFirstArgs>(args?: SelectSubset<T, ReviewFindFirstArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Review that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReviewFindFirstOrThrowArgs>(args?: SelectSubset<T, ReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reviews
     * const reviews = await prisma.review.findMany()
     * 
     * // Get first 10 Reviews
     * const reviews = await prisma.review.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reviewWithIdOnly = await prisma.review.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReviewFindManyArgs>(args?: SelectSubset<T, ReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Review.
     * @param {ReviewCreateArgs} args - Arguments to create a Review.
     * @example
     * // Create one Review
     * const Review = await prisma.review.create({
     *   data: {
     *     // ... data to create a Review
     *   }
     * })
     * 
     */
    create<T extends ReviewCreateArgs>(args: SelectSubset<T, ReviewCreateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reviews.
     * @param {ReviewCreateManyArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReviewCreateManyArgs>(args?: SelectSubset<T, ReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reviews and returns the data saved in the database.
     * @param {ReviewCreateManyAndReturnArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reviews and only return the `id`
     * const reviewWithIdOnly = await prisma.review.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReviewCreateManyAndReturnArgs>(args?: SelectSubset<T, ReviewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Review.
     * @param {ReviewDeleteArgs} args - Arguments to delete one Review.
     * @example
     * // Delete one Review
     * const Review = await prisma.review.delete({
     *   where: {
     *     // ... filter to delete one Review
     *   }
     * })
     * 
     */
    delete<T extends ReviewDeleteArgs>(args: SelectSubset<T, ReviewDeleteArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Review.
     * @param {ReviewUpdateArgs} args - Arguments to update one Review.
     * @example
     * // Update one Review
     * const review = await prisma.review.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReviewUpdateArgs>(args: SelectSubset<T, ReviewUpdateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reviews.
     * @param {ReviewDeleteManyArgs} args - Arguments to filter Reviews to delete.
     * @example
     * // Delete a few Reviews
     * const { count } = await prisma.review.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReviewDeleteManyArgs>(args?: SelectSubset<T, ReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReviewUpdateManyArgs>(args: SelectSubset<T, ReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews and returns the data updated in the database.
     * @param {ReviewUpdateManyAndReturnArgs} args - Arguments to update many Reviews.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Reviews and only return the `id`
     * const reviewWithIdOnly = await prisma.review.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReviewUpdateManyAndReturnArgs>(args: SelectSubset<T, ReviewUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Review.
     * @param {ReviewUpsertArgs} args - Arguments to update or create a Review.
     * @example
     * // Update or create a Review
     * const review = await prisma.review.upsert({
     *   create: {
     *     // ... data to create a Review
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Review we want to update
     *   }
     * })
     */
    upsert<T extends ReviewUpsertArgs>(args: SelectSubset<T, ReviewUpsertArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewCountArgs} args - Arguments to filter Reviews to count.
     * @example
     * // Count the number of Reviews
     * const count = await prisma.review.count({
     *   where: {
     *     // ... the filter for the Reviews we want to count
     *   }
     * })
    **/
    count<T extends ReviewCountArgs>(
      args?: Subset<T, ReviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReviewAggregateArgs>(args: Subset<T, ReviewAggregateArgs>): Prisma.PrismaPromise<GetReviewAggregateType<T>>

    /**
     * Group by Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReviewGroupByArgs['orderBy'] }
        : { orderBy?: ReviewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Review model
   */
  readonly fields: ReviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Review.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    receiver<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    job<T extends Review$jobArgs<ExtArgs> = {}>(args?: Subset<T, Review$jobArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Review model
   */
  interface ReviewFieldRefs {
    readonly id: FieldRef<"Review", 'String'>
    readonly rating: FieldRef<"Review", 'Int'>
    readonly comment: FieldRef<"Review", 'String'>
    readonly authorId: FieldRef<"Review", 'String'>
    readonly receiverId: FieldRef<"Review", 'String'>
    readonly jobId: FieldRef<"Review", 'String'>
    readonly createdAt: FieldRef<"Review", 'DateTime'>
    readonly updatedAt: FieldRef<"Review", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Review findUnique
   */
  export type ReviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findUniqueOrThrow
   */
  export type ReviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findFirst
   */
  export type ReviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findFirstOrThrow
   */
  export type ReviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findMany
   */
  export type ReviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Reviews to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review create
   */
  export type ReviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to create a Review.
     */
    data: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
  }

  /**
   * Review createMany
   */
  export type ReviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Review createManyAndReturn
   */
  export type ReviewCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Review update
   */
  export type ReviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to update a Review.
     */
    data: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
    /**
     * Choose, which Review to update.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review updateMany
   */
  export type ReviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reviews.
     */
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyInput>
    /**
     * Filter which Reviews to update
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to update.
     */
    limit?: number
  }

  /**
   * Review updateManyAndReturn
   */
  export type ReviewUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * The data used to update Reviews.
     */
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyInput>
    /**
     * Filter which Reviews to update
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Review upsert
   */
  export type ReviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The filter to search for the Review to update in case it exists.
     */
    where: ReviewWhereUniqueInput
    /**
     * In case the Review found by the `where` argument doesn't exist, create a new Review with this data.
     */
    create: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
    /**
     * In case the Review was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
  }

  /**
   * Review delete
   */
  export type ReviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter which Review to delete.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review deleteMany
   */
  export type ReviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reviews to delete
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to delete.
     */
    limit?: number
  }

  /**
   * Review.job
   */
  export type Review$jobArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    where?: JobWhereInput
  }

  /**
   * Review without action
   */
  export type ReviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
  }


  /**
   * Model Conversation
   */

  export type AggregateConversation = {
    _count: ConversationCountAggregateOutputType | null
    _min: ConversationMinAggregateOutputType | null
    _max: ConversationMaxAggregateOutputType | null
  }

  export type ConversationMinAggregateOutputType = {
    id: string | null
    jobId: string | null
    projectName: string | null
    isActive: boolean | null
    lastMessageId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConversationMaxAggregateOutputType = {
    id: string | null
    jobId: string | null
    projectName: string | null
    isActive: boolean | null
    lastMessageId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConversationCountAggregateOutputType = {
    id: number
    participants: number
    jobId: number
    projectName: number
    isActive: number
    lastMessageId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ConversationMinAggregateInputType = {
    id?: true
    jobId?: true
    projectName?: true
    isActive?: true
    lastMessageId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConversationMaxAggregateInputType = {
    id?: true
    jobId?: true
    projectName?: true
    isActive?: true
    lastMessageId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConversationCountAggregateInputType = {
    id?: true
    participants?: true
    jobId?: true
    projectName?: true
    isActive?: true
    lastMessageId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ConversationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Conversation to aggregate.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Conversations
    **/
    _count?: true | ConversationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConversationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConversationMaxAggregateInputType
  }

  export type GetConversationAggregateType<T extends ConversationAggregateArgs> = {
        [P in keyof T & keyof AggregateConversation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConversation[P]>
      : GetScalarType<T[P], AggregateConversation[P]>
  }




  export type ConversationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationWhereInput
    orderBy?: ConversationOrderByWithAggregationInput | ConversationOrderByWithAggregationInput[]
    by: ConversationScalarFieldEnum[] | ConversationScalarFieldEnum
    having?: ConversationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConversationCountAggregateInputType | true
    _min?: ConversationMinAggregateInputType
    _max?: ConversationMaxAggregateInputType
  }

  export type ConversationGroupByOutputType = {
    id: string
    participants: string[]
    jobId: string | null
    projectName: string | null
    isActive: boolean
    lastMessageId: string | null
    createdAt: Date
    updatedAt: Date
    _count: ConversationCountAggregateOutputType | null
    _min: ConversationMinAggregateOutputType | null
    _max: ConversationMaxAggregateOutputType | null
  }

  type GetConversationGroupByPayload<T extends ConversationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConversationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConversationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConversationGroupByOutputType[P]>
            : GetScalarType<T[P], ConversationGroupByOutputType[P]>
        }
      >
    >


  export type ConversationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    participants?: boolean
    jobId?: boolean
    projectName?: boolean
    isActive?: boolean
    lastMessageId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    job?: boolean | Conversation$jobArgs<ExtArgs>
    messages?: boolean | Conversation$messagesArgs<ExtArgs>
    lastMessage?: boolean | Conversation$lastMessageArgs<ExtArgs>
    _count?: boolean | ConversationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conversation"]>

  export type ConversationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    participants?: boolean
    jobId?: boolean
    projectName?: boolean
    isActive?: boolean
    lastMessageId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    job?: boolean | Conversation$jobArgs<ExtArgs>
    lastMessage?: boolean | Conversation$lastMessageArgs<ExtArgs>
  }, ExtArgs["result"]["conversation"]>

  export type ConversationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    participants?: boolean
    jobId?: boolean
    projectName?: boolean
    isActive?: boolean
    lastMessageId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    job?: boolean | Conversation$jobArgs<ExtArgs>
    lastMessage?: boolean | Conversation$lastMessageArgs<ExtArgs>
  }, ExtArgs["result"]["conversation"]>

  export type ConversationSelectScalar = {
    id?: boolean
    participants?: boolean
    jobId?: boolean
    projectName?: boolean
    isActive?: boolean
    lastMessageId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ConversationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "participants" | "jobId" | "projectName" | "isActive" | "lastMessageId" | "createdAt" | "updatedAt", ExtArgs["result"]["conversation"]>
  export type ConversationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | Conversation$jobArgs<ExtArgs>
    messages?: boolean | Conversation$messagesArgs<ExtArgs>
    lastMessage?: boolean | Conversation$lastMessageArgs<ExtArgs>
    _count?: boolean | ConversationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ConversationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | Conversation$jobArgs<ExtArgs>
    lastMessage?: boolean | Conversation$lastMessageArgs<ExtArgs>
  }
  export type ConversationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | Conversation$jobArgs<ExtArgs>
    lastMessage?: boolean | Conversation$lastMessageArgs<ExtArgs>
  }

  export type $ConversationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Conversation"
    objects: {
      job: Prisma.$JobPayload<ExtArgs> | null
      messages: Prisma.$MessagePayload<ExtArgs>[]
      lastMessage: Prisma.$MessagePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      participants: string[]
      jobId: string | null
      projectName: string | null
      isActive: boolean
      lastMessageId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["conversation"]>
    composites: {}
  }

  type ConversationGetPayload<S extends boolean | null | undefined | ConversationDefaultArgs> = $Result.GetResult<Prisma.$ConversationPayload, S>

  type ConversationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConversationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConversationCountAggregateInputType | true
    }

  export interface ConversationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Conversation'], meta: { name: 'Conversation' } }
    /**
     * Find zero or one Conversation that matches the filter.
     * @param {ConversationFindUniqueArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConversationFindUniqueArgs>(args: SelectSubset<T, ConversationFindUniqueArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Conversation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConversationFindUniqueOrThrowArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConversationFindUniqueOrThrowArgs>(args: SelectSubset<T, ConversationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Conversation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindFirstArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConversationFindFirstArgs>(args?: SelectSubset<T, ConversationFindFirstArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Conversation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindFirstOrThrowArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConversationFindFirstOrThrowArgs>(args?: SelectSubset<T, ConversationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Conversations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Conversations
     * const conversations = await prisma.conversation.findMany()
     * 
     * // Get first 10 Conversations
     * const conversations = await prisma.conversation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const conversationWithIdOnly = await prisma.conversation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConversationFindManyArgs>(args?: SelectSubset<T, ConversationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Conversation.
     * @param {ConversationCreateArgs} args - Arguments to create a Conversation.
     * @example
     * // Create one Conversation
     * const Conversation = await prisma.conversation.create({
     *   data: {
     *     // ... data to create a Conversation
     *   }
     * })
     * 
     */
    create<T extends ConversationCreateArgs>(args: SelectSubset<T, ConversationCreateArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Conversations.
     * @param {ConversationCreateManyArgs} args - Arguments to create many Conversations.
     * @example
     * // Create many Conversations
     * const conversation = await prisma.conversation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConversationCreateManyArgs>(args?: SelectSubset<T, ConversationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Conversations and returns the data saved in the database.
     * @param {ConversationCreateManyAndReturnArgs} args - Arguments to create many Conversations.
     * @example
     * // Create many Conversations
     * const conversation = await prisma.conversation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Conversations and only return the `id`
     * const conversationWithIdOnly = await prisma.conversation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConversationCreateManyAndReturnArgs>(args?: SelectSubset<T, ConversationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Conversation.
     * @param {ConversationDeleteArgs} args - Arguments to delete one Conversation.
     * @example
     * // Delete one Conversation
     * const Conversation = await prisma.conversation.delete({
     *   where: {
     *     // ... filter to delete one Conversation
     *   }
     * })
     * 
     */
    delete<T extends ConversationDeleteArgs>(args: SelectSubset<T, ConversationDeleteArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Conversation.
     * @param {ConversationUpdateArgs} args - Arguments to update one Conversation.
     * @example
     * // Update one Conversation
     * const conversation = await prisma.conversation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConversationUpdateArgs>(args: SelectSubset<T, ConversationUpdateArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Conversations.
     * @param {ConversationDeleteManyArgs} args - Arguments to filter Conversations to delete.
     * @example
     * // Delete a few Conversations
     * const { count } = await prisma.conversation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConversationDeleteManyArgs>(args?: SelectSubset<T, ConversationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Conversations
     * const conversation = await prisma.conversation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConversationUpdateManyArgs>(args: SelectSubset<T, ConversationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conversations and returns the data updated in the database.
     * @param {ConversationUpdateManyAndReturnArgs} args - Arguments to update many Conversations.
     * @example
     * // Update many Conversations
     * const conversation = await prisma.conversation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Conversations and only return the `id`
     * const conversationWithIdOnly = await prisma.conversation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ConversationUpdateManyAndReturnArgs>(args: SelectSubset<T, ConversationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Conversation.
     * @param {ConversationUpsertArgs} args - Arguments to update or create a Conversation.
     * @example
     * // Update or create a Conversation
     * const conversation = await prisma.conversation.upsert({
     *   create: {
     *     // ... data to create a Conversation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Conversation we want to update
     *   }
     * })
     */
    upsert<T extends ConversationUpsertArgs>(args: SelectSubset<T, ConversationUpsertArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Conversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationCountArgs} args - Arguments to filter Conversations to count.
     * @example
     * // Count the number of Conversations
     * const count = await prisma.conversation.count({
     *   where: {
     *     // ... the filter for the Conversations we want to count
     *   }
     * })
    **/
    count<T extends ConversationCountArgs>(
      args?: Subset<T, ConversationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConversationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Conversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConversationAggregateArgs>(args: Subset<T, ConversationAggregateArgs>): Prisma.PrismaPromise<GetConversationAggregateType<T>>

    /**
     * Group by Conversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConversationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConversationGroupByArgs['orderBy'] }
        : { orderBy?: ConversationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConversationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConversationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Conversation model
   */
  readonly fields: ConversationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Conversation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConversationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    job<T extends Conversation$jobArgs<ExtArgs> = {}>(args?: Subset<T, Conversation$jobArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    messages<T extends Conversation$messagesArgs<ExtArgs> = {}>(args?: Subset<T, Conversation$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    lastMessage<T extends Conversation$lastMessageArgs<ExtArgs> = {}>(args?: Subset<T, Conversation$lastMessageArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Conversation model
   */
  interface ConversationFieldRefs {
    readonly id: FieldRef<"Conversation", 'String'>
    readonly participants: FieldRef<"Conversation", 'String[]'>
    readonly jobId: FieldRef<"Conversation", 'String'>
    readonly projectName: FieldRef<"Conversation", 'String'>
    readonly isActive: FieldRef<"Conversation", 'Boolean'>
    readonly lastMessageId: FieldRef<"Conversation", 'String'>
    readonly createdAt: FieldRef<"Conversation", 'DateTime'>
    readonly updatedAt: FieldRef<"Conversation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Conversation findUnique
   */
  export type ConversationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation findUniqueOrThrow
   */
  export type ConversationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation findFirst
   */
  export type ConversationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conversations.
     */
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation findFirstOrThrow
   */
  export type ConversationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conversations.
     */
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation findMany
   */
  export type ConversationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversations to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation create
   */
  export type ConversationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The data needed to create a Conversation.
     */
    data: XOR<ConversationCreateInput, ConversationUncheckedCreateInput>
  }

  /**
   * Conversation createMany
   */
  export type ConversationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Conversations.
     */
    data: ConversationCreateManyInput | ConversationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Conversation createManyAndReturn
   */
  export type ConversationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * The data used to create many Conversations.
     */
    data: ConversationCreateManyInput | ConversationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Conversation update
   */
  export type ConversationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The data needed to update a Conversation.
     */
    data: XOR<ConversationUpdateInput, ConversationUncheckedUpdateInput>
    /**
     * Choose, which Conversation to update.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation updateMany
   */
  export type ConversationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Conversations.
     */
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyInput>
    /**
     * Filter which Conversations to update
     */
    where?: ConversationWhereInput
    /**
     * Limit how many Conversations to update.
     */
    limit?: number
  }

  /**
   * Conversation updateManyAndReturn
   */
  export type ConversationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * The data used to update Conversations.
     */
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyInput>
    /**
     * Filter which Conversations to update
     */
    where?: ConversationWhereInput
    /**
     * Limit how many Conversations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Conversation upsert
   */
  export type ConversationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The filter to search for the Conversation to update in case it exists.
     */
    where: ConversationWhereUniqueInput
    /**
     * In case the Conversation found by the `where` argument doesn't exist, create a new Conversation with this data.
     */
    create: XOR<ConversationCreateInput, ConversationUncheckedCreateInput>
    /**
     * In case the Conversation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConversationUpdateInput, ConversationUncheckedUpdateInput>
  }

  /**
   * Conversation delete
   */
  export type ConversationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter which Conversation to delete.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation deleteMany
   */
  export type ConversationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Conversations to delete
     */
    where?: ConversationWhereInput
    /**
     * Limit how many Conversations to delete.
     */
    limit?: number
  }

  /**
   * Conversation.job
   */
  export type Conversation$jobArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    where?: JobWhereInput
  }

  /**
   * Conversation.messages
   */
  export type Conversation$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Conversation.lastMessage
   */
  export type Conversation$lastMessageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
  }

  /**
   * Conversation without action
   */
  export type ConversationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
  }


  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageMinAggregateOutputType = {
    id: string | null
    content: string | null
    senderEmail: string | null
    receiverEmail: string | null
    conversationId: string | null
    isRead: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MessageMaxAggregateOutputType = {
    id: string | null
    content: string | null
    senderEmail: string | null
    receiverEmail: string | null
    conversationId: string | null
    isRead: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    content: number
    senderEmail: number
    receiverEmail: number
    conversationId: number
    isRead: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MessageMinAggregateInputType = {
    id?: true
    content?: true
    senderEmail?: true
    receiverEmail?: true
    conversationId?: true
    isRead?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    content?: true
    senderEmail?: true
    receiverEmail?: true
    conversationId?: true
    isRead?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    content?: true
    senderEmail?: true
    receiverEmail?: true
    conversationId?: true
    isRead?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: string
    content: string
    senderEmail: string
    receiverEmail: string
    conversationId: string
    isRead: boolean
    createdAt: Date
    updatedAt: Date
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    senderEmail?: boolean
    receiverEmail?: boolean
    conversationId?: boolean
    isRead?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
    conversationAsLastMessage?: boolean | Message$conversationAsLastMessageArgs<ExtArgs>
    _count?: boolean | MessageCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    senderEmail?: boolean
    receiverEmail?: boolean
    conversationId?: boolean
    isRead?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    senderEmail?: boolean
    receiverEmail?: boolean
    conversationId?: boolean
    isRead?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectScalar = {
    id?: boolean
    content?: boolean
    senderEmail?: boolean
    receiverEmail?: boolean
    conversationId?: boolean
    isRead?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "content" | "senderEmail" | "receiverEmail" | "conversationId" | "isRead" | "createdAt" | "updatedAt", ExtArgs["result"]["message"]>
  export type MessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
    conversationAsLastMessage?: boolean | Message$conversationAsLastMessageArgs<ExtArgs>
    _count?: boolean | MessageCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }
  export type MessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {
      sender: Prisma.$UserPayload<ExtArgs>
      receiver: Prisma.$UserPayload<ExtArgs>
      conversation: Prisma.$ConversationPayload<ExtArgs>
      conversationAsLastMessage: Prisma.$ConversationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      content: string
      senderEmail: string
      receiverEmail: string
      conversationId: string
      isRead: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = $Result.GetResult<Prisma.$MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageFindManyArgs>(args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
     */
    create<T extends MessageCreateArgs>(args: SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageCreateManyArgs>(args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
     */
    delete<T extends MessageDeleteArgs>(args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageUpdateArgs>(args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDeleteManyArgs>(args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageUpdateManyArgs>(args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages and returns the data updated in the database.
     * @param {MessageUpdateManyAndReturnArgs} args - Arguments to update many Messages.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MessageUpdateManyAndReturnArgs>(args: SelectSubset<T, MessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Message model
   */
  readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sender<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    receiver<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    conversation<T extends ConversationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConversationDefaultArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    conversationAsLastMessage<T extends Message$conversationAsLastMessageArgs<ExtArgs> = {}>(args?: Subset<T, Message$conversationAsLastMessageArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Message model
   */
  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'String'>
    readonly content: FieldRef<"Message", 'String'>
    readonly senderEmail: FieldRef<"Message", 'String'>
    readonly receiverEmail: FieldRef<"Message", 'String'>
    readonly conversationId: FieldRef<"Message", 'String'>
    readonly isRead: FieldRef<"Message", 'Boolean'>
    readonly createdAt: FieldRef<"Message", 'DateTime'>
    readonly updatedAt: FieldRef<"Message", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Message createManyAndReturn
   */
  export type MessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
  }

  /**
   * Message updateManyAndReturn
   */
  export type MessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to delete.
     */
    limit?: number
  }

  /**
   * Message.conversationAsLastMessage
   */
  export type Message$conversationAsLastMessageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    where?: ConversationWhereInput
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    cursor?: ConversationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Message without action
   */
  export type MessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    title: string | null
    message: string | null
    type: $Enums.NotificationType | null
    isRead: boolean | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    title: string | null
    message: string | null
    type: $Enums.NotificationType | null
    isRead: boolean | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    title: number
    message: number
    type: number
    isRead: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NotificationMinAggregateInputType = {
    id?: true
    title?: true
    message?: true
    type?: true
    isRead?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    title?: true
    message?: true
    type?: true
    isRead?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    title?: true
    message?: true
    type?: true
    isRead?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: string
    title: string
    message: string
    type: $Enums.NotificationType
    isRead: boolean
    userId: string
    createdAt: Date
    updatedAt: Date
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    isRead?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    isRead?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    isRead?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    isRead?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type NotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "message" | "type" | "isRead" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["notification"]>
  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      message: string
      type: $Enums.NotificationType
      isRead: boolean
      userId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications and returns the data updated in the database.
     * @param {NotificationUpdateManyAndReturnArgs} args - Arguments to update many Notifications.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificationUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'String'>
    readonly title: FieldRef<"Notification", 'String'>
    readonly message: FieldRef<"Notification", 'String'>
    readonly type: FieldRef<"Notification", 'NotificationType'>
    readonly isRead: FieldRef<"Notification", 'Boolean'>
    readonly userId: FieldRef<"Notification", 'String'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
    readonly updatedAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification updateManyAndReturn
   */
  export type NotificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to delete.
     */
    limit?: number
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
  }


  /**
   * Model SavedFreelancer
   */

  export type AggregateSavedFreelancer = {
    _count: SavedFreelancerCountAggregateOutputType | null
    _min: SavedFreelancerMinAggregateOutputType | null
    _max: SavedFreelancerMaxAggregateOutputType | null
  }

  export type SavedFreelancerMinAggregateOutputType = {
    id: string | null
    userId: string | null
    freelancerId: string | null
    createdAt: Date | null
  }

  export type SavedFreelancerMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    freelancerId: string | null
    createdAt: Date | null
  }

  export type SavedFreelancerCountAggregateOutputType = {
    id: number
    userId: number
    freelancerId: number
    createdAt: number
    _all: number
  }


  export type SavedFreelancerMinAggregateInputType = {
    id?: true
    userId?: true
    freelancerId?: true
    createdAt?: true
  }

  export type SavedFreelancerMaxAggregateInputType = {
    id?: true
    userId?: true
    freelancerId?: true
    createdAt?: true
  }

  export type SavedFreelancerCountAggregateInputType = {
    id?: true
    userId?: true
    freelancerId?: true
    createdAt?: true
    _all?: true
  }

  export type SavedFreelancerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SavedFreelancer to aggregate.
     */
    where?: SavedFreelancerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedFreelancers to fetch.
     */
    orderBy?: SavedFreelancerOrderByWithRelationInput | SavedFreelancerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SavedFreelancerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedFreelancers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedFreelancers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SavedFreelancers
    **/
    _count?: true | SavedFreelancerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SavedFreelancerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SavedFreelancerMaxAggregateInputType
  }

  export type GetSavedFreelancerAggregateType<T extends SavedFreelancerAggregateArgs> = {
        [P in keyof T & keyof AggregateSavedFreelancer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSavedFreelancer[P]>
      : GetScalarType<T[P], AggregateSavedFreelancer[P]>
  }




  export type SavedFreelancerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SavedFreelancerWhereInput
    orderBy?: SavedFreelancerOrderByWithAggregationInput | SavedFreelancerOrderByWithAggregationInput[]
    by: SavedFreelancerScalarFieldEnum[] | SavedFreelancerScalarFieldEnum
    having?: SavedFreelancerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SavedFreelancerCountAggregateInputType | true
    _min?: SavedFreelancerMinAggregateInputType
    _max?: SavedFreelancerMaxAggregateInputType
  }

  export type SavedFreelancerGroupByOutputType = {
    id: string
    userId: string
    freelancerId: string
    createdAt: Date
    _count: SavedFreelancerCountAggregateOutputType | null
    _min: SavedFreelancerMinAggregateOutputType | null
    _max: SavedFreelancerMaxAggregateOutputType | null
  }

  type GetSavedFreelancerGroupByPayload<T extends SavedFreelancerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SavedFreelancerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SavedFreelancerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SavedFreelancerGroupByOutputType[P]>
            : GetScalarType<T[P], SavedFreelancerGroupByOutputType[P]>
        }
      >
    >


  export type SavedFreelancerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    freelancerId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    freelancer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["savedFreelancer"]>

  export type SavedFreelancerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    freelancerId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    freelancer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["savedFreelancer"]>

  export type SavedFreelancerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    freelancerId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    freelancer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["savedFreelancer"]>

  export type SavedFreelancerSelectScalar = {
    id?: boolean
    userId?: boolean
    freelancerId?: boolean
    createdAt?: boolean
  }

  export type SavedFreelancerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "freelancerId" | "createdAt", ExtArgs["result"]["savedFreelancer"]>
  export type SavedFreelancerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    freelancer?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SavedFreelancerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    freelancer?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SavedFreelancerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    freelancer?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SavedFreelancerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SavedFreelancer"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      freelancer: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      freelancerId: string
      createdAt: Date
    }, ExtArgs["result"]["savedFreelancer"]>
    composites: {}
  }

  type SavedFreelancerGetPayload<S extends boolean | null | undefined | SavedFreelancerDefaultArgs> = $Result.GetResult<Prisma.$SavedFreelancerPayload, S>

  type SavedFreelancerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SavedFreelancerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SavedFreelancerCountAggregateInputType | true
    }

  export interface SavedFreelancerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SavedFreelancer'], meta: { name: 'SavedFreelancer' } }
    /**
     * Find zero or one SavedFreelancer that matches the filter.
     * @param {SavedFreelancerFindUniqueArgs} args - Arguments to find a SavedFreelancer
     * @example
     * // Get one SavedFreelancer
     * const savedFreelancer = await prisma.savedFreelancer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SavedFreelancerFindUniqueArgs>(args: SelectSubset<T, SavedFreelancerFindUniqueArgs<ExtArgs>>): Prisma__SavedFreelancerClient<$Result.GetResult<Prisma.$SavedFreelancerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SavedFreelancer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SavedFreelancerFindUniqueOrThrowArgs} args - Arguments to find a SavedFreelancer
     * @example
     * // Get one SavedFreelancer
     * const savedFreelancer = await prisma.savedFreelancer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SavedFreelancerFindUniqueOrThrowArgs>(args: SelectSubset<T, SavedFreelancerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SavedFreelancerClient<$Result.GetResult<Prisma.$SavedFreelancerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SavedFreelancer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedFreelancerFindFirstArgs} args - Arguments to find a SavedFreelancer
     * @example
     * // Get one SavedFreelancer
     * const savedFreelancer = await prisma.savedFreelancer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SavedFreelancerFindFirstArgs>(args?: SelectSubset<T, SavedFreelancerFindFirstArgs<ExtArgs>>): Prisma__SavedFreelancerClient<$Result.GetResult<Prisma.$SavedFreelancerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SavedFreelancer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedFreelancerFindFirstOrThrowArgs} args - Arguments to find a SavedFreelancer
     * @example
     * // Get one SavedFreelancer
     * const savedFreelancer = await prisma.savedFreelancer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SavedFreelancerFindFirstOrThrowArgs>(args?: SelectSubset<T, SavedFreelancerFindFirstOrThrowArgs<ExtArgs>>): Prisma__SavedFreelancerClient<$Result.GetResult<Prisma.$SavedFreelancerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SavedFreelancers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedFreelancerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SavedFreelancers
     * const savedFreelancers = await prisma.savedFreelancer.findMany()
     * 
     * // Get first 10 SavedFreelancers
     * const savedFreelancers = await prisma.savedFreelancer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const savedFreelancerWithIdOnly = await prisma.savedFreelancer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SavedFreelancerFindManyArgs>(args?: SelectSubset<T, SavedFreelancerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedFreelancerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SavedFreelancer.
     * @param {SavedFreelancerCreateArgs} args - Arguments to create a SavedFreelancer.
     * @example
     * // Create one SavedFreelancer
     * const SavedFreelancer = await prisma.savedFreelancer.create({
     *   data: {
     *     // ... data to create a SavedFreelancer
     *   }
     * })
     * 
     */
    create<T extends SavedFreelancerCreateArgs>(args: SelectSubset<T, SavedFreelancerCreateArgs<ExtArgs>>): Prisma__SavedFreelancerClient<$Result.GetResult<Prisma.$SavedFreelancerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SavedFreelancers.
     * @param {SavedFreelancerCreateManyArgs} args - Arguments to create many SavedFreelancers.
     * @example
     * // Create many SavedFreelancers
     * const savedFreelancer = await prisma.savedFreelancer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SavedFreelancerCreateManyArgs>(args?: SelectSubset<T, SavedFreelancerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SavedFreelancers and returns the data saved in the database.
     * @param {SavedFreelancerCreateManyAndReturnArgs} args - Arguments to create many SavedFreelancers.
     * @example
     * // Create many SavedFreelancers
     * const savedFreelancer = await prisma.savedFreelancer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SavedFreelancers and only return the `id`
     * const savedFreelancerWithIdOnly = await prisma.savedFreelancer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SavedFreelancerCreateManyAndReturnArgs>(args?: SelectSubset<T, SavedFreelancerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedFreelancerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SavedFreelancer.
     * @param {SavedFreelancerDeleteArgs} args - Arguments to delete one SavedFreelancer.
     * @example
     * // Delete one SavedFreelancer
     * const SavedFreelancer = await prisma.savedFreelancer.delete({
     *   where: {
     *     // ... filter to delete one SavedFreelancer
     *   }
     * })
     * 
     */
    delete<T extends SavedFreelancerDeleteArgs>(args: SelectSubset<T, SavedFreelancerDeleteArgs<ExtArgs>>): Prisma__SavedFreelancerClient<$Result.GetResult<Prisma.$SavedFreelancerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SavedFreelancer.
     * @param {SavedFreelancerUpdateArgs} args - Arguments to update one SavedFreelancer.
     * @example
     * // Update one SavedFreelancer
     * const savedFreelancer = await prisma.savedFreelancer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SavedFreelancerUpdateArgs>(args: SelectSubset<T, SavedFreelancerUpdateArgs<ExtArgs>>): Prisma__SavedFreelancerClient<$Result.GetResult<Prisma.$SavedFreelancerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SavedFreelancers.
     * @param {SavedFreelancerDeleteManyArgs} args - Arguments to filter SavedFreelancers to delete.
     * @example
     * // Delete a few SavedFreelancers
     * const { count } = await prisma.savedFreelancer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SavedFreelancerDeleteManyArgs>(args?: SelectSubset<T, SavedFreelancerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SavedFreelancers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedFreelancerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SavedFreelancers
     * const savedFreelancer = await prisma.savedFreelancer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SavedFreelancerUpdateManyArgs>(args: SelectSubset<T, SavedFreelancerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SavedFreelancers and returns the data updated in the database.
     * @param {SavedFreelancerUpdateManyAndReturnArgs} args - Arguments to update many SavedFreelancers.
     * @example
     * // Update many SavedFreelancers
     * const savedFreelancer = await prisma.savedFreelancer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SavedFreelancers and only return the `id`
     * const savedFreelancerWithIdOnly = await prisma.savedFreelancer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SavedFreelancerUpdateManyAndReturnArgs>(args: SelectSubset<T, SavedFreelancerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedFreelancerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SavedFreelancer.
     * @param {SavedFreelancerUpsertArgs} args - Arguments to update or create a SavedFreelancer.
     * @example
     * // Update or create a SavedFreelancer
     * const savedFreelancer = await prisma.savedFreelancer.upsert({
     *   create: {
     *     // ... data to create a SavedFreelancer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SavedFreelancer we want to update
     *   }
     * })
     */
    upsert<T extends SavedFreelancerUpsertArgs>(args: SelectSubset<T, SavedFreelancerUpsertArgs<ExtArgs>>): Prisma__SavedFreelancerClient<$Result.GetResult<Prisma.$SavedFreelancerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SavedFreelancers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedFreelancerCountArgs} args - Arguments to filter SavedFreelancers to count.
     * @example
     * // Count the number of SavedFreelancers
     * const count = await prisma.savedFreelancer.count({
     *   where: {
     *     // ... the filter for the SavedFreelancers we want to count
     *   }
     * })
    **/
    count<T extends SavedFreelancerCountArgs>(
      args?: Subset<T, SavedFreelancerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SavedFreelancerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SavedFreelancer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedFreelancerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SavedFreelancerAggregateArgs>(args: Subset<T, SavedFreelancerAggregateArgs>): Prisma.PrismaPromise<GetSavedFreelancerAggregateType<T>>

    /**
     * Group by SavedFreelancer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedFreelancerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SavedFreelancerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SavedFreelancerGroupByArgs['orderBy'] }
        : { orderBy?: SavedFreelancerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SavedFreelancerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSavedFreelancerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SavedFreelancer model
   */
  readonly fields: SavedFreelancerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SavedFreelancer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SavedFreelancerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    freelancer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SavedFreelancer model
   */
  interface SavedFreelancerFieldRefs {
    readonly id: FieldRef<"SavedFreelancer", 'String'>
    readonly userId: FieldRef<"SavedFreelancer", 'String'>
    readonly freelancerId: FieldRef<"SavedFreelancer", 'String'>
    readonly createdAt: FieldRef<"SavedFreelancer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SavedFreelancer findUnique
   */
  export type SavedFreelancerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedFreelancer
     */
    select?: SavedFreelancerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedFreelancer
     */
    omit?: SavedFreelancerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedFreelancerInclude<ExtArgs> | null
    /**
     * Filter, which SavedFreelancer to fetch.
     */
    where: SavedFreelancerWhereUniqueInput
  }

  /**
   * SavedFreelancer findUniqueOrThrow
   */
  export type SavedFreelancerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedFreelancer
     */
    select?: SavedFreelancerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedFreelancer
     */
    omit?: SavedFreelancerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedFreelancerInclude<ExtArgs> | null
    /**
     * Filter, which SavedFreelancer to fetch.
     */
    where: SavedFreelancerWhereUniqueInput
  }

  /**
   * SavedFreelancer findFirst
   */
  export type SavedFreelancerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedFreelancer
     */
    select?: SavedFreelancerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedFreelancer
     */
    omit?: SavedFreelancerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedFreelancerInclude<ExtArgs> | null
    /**
     * Filter, which SavedFreelancer to fetch.
     */
    where?: SavedFreelancerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedFreelancers to fetch.
     */
    orderBy?: SavedFreelancerOrderByWithRelationInput | SavedFreelancerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SavedFreelancers.
     */
    cursor?: SavedFreelancerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedFreelancers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedFreelancers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SavedFreelancers.
     */
    distinct?: SavedFreelancerScalarFieldEnum | SavedFreelancerScalarFieldEnum[]
  }

  /**
   * SavedFreelancer findFirstOrThrow
   */
  export type SavedFreelancerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedFreelancer
     */
    select?: SavedFreelancerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedFreelancer
     */
    omit?: SavedFreelancerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedFreelancerInclude<ExtArgs> | null
    /**
     * Filter, which SavedFreelancer to fetch.
     */
    where?: SavedFreelancerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedFreelancers to fetch.
     */
    orderBy?: SavedFreelancerOrderByWithRelationInput | SavedFreelancerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SavedFreelancers.
     */
    cursor?: SavedFreelancerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedFreelancers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedFreelancers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SavedFreelancers.
     */
    distinct?: SavedFreelancerScalarFieldEnum | SavedFreelancerScalarFieldEnum[]
  }

  /**
   * SavedFreelancer findMany
   */
  export type SavedFreelancerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedFreelancer
     */
    select?: SavedFreelancerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedFreelancer
     */
    omit?: SavedFreelancerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedFreelancerInclude<ExtArgs> | null
    /**
     * Filter, which SavedFreelancers to fetch.
     */
    where?: SavedFreelancerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedFreelancers to fetch.
     */
    orderBy?: SavedFreelancerOrderByWithRelationInput | SavedFreelancerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SavedFreelancers.
     */
    cursor?: SavedFreelancerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedFreelancers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedFreelancers.
     */
    skip?: number
    distinct?: SavedFreelancerScalarFieldEnum | SavedFreelancerScalarFieldEnum[]
  }

  /**
   * SavedFreelancer create
   */
  export type SavedFreelancerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedFreelancer
     */
    select?: SavedFreelancerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedFreelancer
     */
    omit?: SavedFreelancerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedFreelancerInclude<ExtArgs> | null
    /**
     * The data needed to create a SavedFreelancer.
     */
    data: XOR<SavedFreelancerCreateInput, SavedFreelancerUncheckedCreateInput>
  }

  /**
   * SavedFreelancer createMany
   */
  export type SavedFreelancerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SavedFreelancers.
     */
    data: SavedFreelancerCreateManyInput | SavedFreelancerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SavedFreelancer createManyAndReturn
   */
  export type SavedFreelancerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedFreelancer
     */
    select?: SavedFreelancerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SavedFreelancer
     */
    omit?: SavedFreelancerOmit<ExtArgs> | null
    /**
     * The data used to create many SavedFreelancers.
     */
    data: SavedFreelancerCreateManyInput | SavedFreelancerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedFreelancerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SavedFreelancer update
   */
  export type SavedFreelancerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedFreelancer
     */
    select?: SavedFreelancerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedFreelancer
     */
    omit?: SavedFreelancerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedFreelancerInclude<ExtArgs> | null
    /**
     * The data needed to update a SavedFreelancer.
     */
    data: XOR<SavedFreelancerUpdateInput, SavedFreelancerUncheckedUpdateInput>
    /**
     * Choose, which SavedFreelancer to update.
     */
    where: SavedFreelancerWhereUniqueInput
  }

  /**
   * SavedFreelancer updateMany
   */
  export type SavedFreelancerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SavedFreelancers.
     */
    data: XOR<SavedFreelancerUpdateManyMutationInput, SavedFreelancerUncheckedUpdateManyInput>
    /**
     * Filter which SavedFreelancers to update
     */
    where?: SavedFreelancerWhereInput
    /**
     * Limit how many SavedFreelancers to update.
     */
    limit?: number
  }

  /**
   * SavedFreelancer updateManyAndReturn
   */
  export type SavedFreelancerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedFreelancer
     */
    select?: SavedFreelancerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SavedFreelancer
     */
    omit?: SavedFreelancerOmit<ExtArgs> | null
    /**
     * The data used to update SavedFreelancers.
     */
    data: XOR<SavedFreelancerUpdateManyMutationInput, SavedFreelancerUncheckedUpdateManyInput>
    /**
     * Filter which SavedFreelancers to update
     */
    where?: SavedFreelancerWhereInput
    /**
     * Limit how many SavedFreelancers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedFreelancerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SavedFreelancer upsert
   */
  export type SavedFreelancerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedFreelancer
     */
    select?: SavedFreelancerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedFreelancer
     */
    omit?: SavedFreelancerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedFreelancerInclude<ExtArgs> | null
    /**
     * The filter to search for the SavedFreelancer to update in case it exists.
     */
    where: SavedFreelancerWhereUniqueInput
    /**
     * In case the SavedFreelancer found by the `where` argument doesn't exist, create a new SavedFreelancer with this data.
     */
    create: XOR<SavedFreelancerCreateInput, SavedFreelancerUncheckedCreateInput>
    /**
     * In case the SavedFreelancer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SavedFreelancerUpdateInput, SavedFreelancerUncheckedUpdateInput>
  }

  /**
   * SavedFreelancer delete
   */
  export type SavedFreelancerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedFreelancer
     */
    select?: SavedFreelancerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedFreelancer
     */
    omit?: SavedFreelancerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedFreelancerInclude<ExtArgs> | null
    /**
     * Filter which SavedFreelancer to delete.
     */
    where: SavedFreelancerWhereUniqueInput
  }

  /**
   * SavedFreelancer deleteMany
   */
  export type SavedFreelancerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SavedFreelancers to delete
     */
    where?: SavedFreelancerWhereInput
    /**
     * Limit how many SavedFreelancers to delete.
     */
    limit?: number
  }

  /**
   * SavedFreelancer without action
   */
  export type SavedFreelancerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedFreelancer
     */
    select?: SavedFreelancerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedFreelancer
     */
    omit?: SavedFreelancerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedFreelancerInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    googleId: 'googleId',
    email: 'email',
    password: 'password',
    firstName: 'firstName',
    lastName: 'lastName',
    avatar: 'avatar',
    bio: 'bio',
    location: 'location',
    phone: 'phone',
    userType: 'userType',
    isOnboarded: 'isOnboarded',
    onboardingStep: 'onboardingStep',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    country: 'country',
    city: 'city',
    timezone: 'timezone',
    title: 'title',
    overview: 'overview',
    skills: 'skills',
    topSkills: 'topSkills',
    serviceOfferings: 'serviceOfferings',
    hourlyRate: 'hourlyRate',
    portfolio: 'portfolio',
    experience: 'experience',
    education: 'education',
    workExperience: 'workExperience',
    certifications: 'certifications',
    availability: 'availability',
    languages: 'languages',
    socialLinks: 'socialLinks',
    category: 'category',
    subcategory: 'subcategory',
    experienceLevel: 'experienceLevel',
    totalEarnings: 'totalEarnings',
    successRate: 'successRate',
    completedJobs: 'completedJobs',
    onTime: 'onTime',
    onBudget: 'onBudget',
    responseTime: 'responseTime',
    lastActive: 'lastActive',
    topRatedPlus: 'topRatedPlus',
    verified: 'verified',
    risingTalent: 'risingTalent',
    portfolioItems: 'portfolioItems',
    testScores: 'testScores',
    specializations: 'specializations',
    memberSince: 'memberSince',
    profileStrength: 'profileStrength',
    repeatHireRate: 'repeatHireRate',
    rating: 'rating',
    reviewCount: 'reviewCount',
    portfolioProjects: 'portfolioProjects',
    workHistory: 'workHistory',
    employmentHistory: 'employmentHistory',
    coverImage: 'coverImage',
    isOnline: 'isOnline',
    hourlyRateRange: 'hourlyRateRange',
    availabilityStatus: 'availabilityStatus',
    companyName: 'companyName',
    companySize: 'companySize',
    industry: 'industry',
    companyWebsite: 'companyWebsite',
    companyDescription: 'companyDescription',
    projectTypes: 'projectTypes',
    preferredSkills: 'preferredSkills',
    budgetRange: 'budgetRange',
    clientType: 'clientType',
    howDidYouHear: 'howDidYouHear',
    interestedCategories: 'interestedCategories',
    urgencyLevel: 'urgencyLevel',
    preferredWorkingStyle: 'preferredWorkingStyle',
    communicationPreference: 'communicationPreference',
    projectDescription: 'projectDescription',
    paymentPreference: 'paymentPreference',
    projectFrequency: 'projectFrequency',
    averageProjectDuration: 'averageProjectDuration',
    maxHourlyRate: 'maxHourlyRate',
    totalMonthlyBudget: 'totalMonthlyBudget',
    projectBasedRates: 'projectBasedRates',
    hoursPerWeek: 'hoursPerWeek',
    workingHours: 'workingHours',
    workingDays: 'workingDays',
    minimumProjectBudget: 'minimumProjectBudget',
    specialRequirements: 'specialRequirements',
    idDocument: 'idDocument',
    addressProof: 'addressProof',
    taxInformation: 'taxInformation',
    phoneVerified: 'phoneVerified'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const JobScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    requirements: 'requirements',
    budget: 'budget',
    minBudget: 'minBudget',
    maxBudget: 'maxBudget',
    hourlyRate: 'hourlyRate',
    duration: 'duration',
    skills: 'skills',
    category: 'category',
    subcategory: 'subcategory',
    projectType: 'projectType',
    experienceLevel: 'experienceLevel',
    workingHours: 'workingHours',
    timezone: 'timezone',
    communicationPreferences: 'communicationPreferences',
    location: 'location',
    isRemote: 'isRemote',
    status: 'status',
    isUrgent: 'isUrgent',
    visibility: 'visibility',
    applicationDeadline: 'applicationDeadline',
    clientId: 'clientId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type JobScalarFieldEnum = (typeof JobScalarFieldEnum)[keyof typeof JobScalarFieldEnum]


  export const ProposalScalarFieldEnum: {
    id: 'id',
    coverLetter: 'coverLetter',
    bidAmount: 'bidAmount',
    estimatedDuration: 'estimatedDuration',
    attachments: 'attachments',
    status: 'status',
    jobId: 'jobId',
    freelancerId: 'freelancerId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    questionResponses: 'questionResponses',
    milestones: 'milestones',
    clientNotes: 'clientNotes',
    clientViewed: 'clientViewed',
    rating: 'rating',
    interview: 'interview',
    originalBudget: 'originalBudget',
    isShortlisted: 'isShortlisted'
  };

  export type ProposalScalarFieldEnum = (typeof ProposalScalarFieldEnum)[keyof typeof ProposalScalarFieldEnum]


  export const ReviewScalarFieldEnum: {
    id: 'id',
    rating: 'rating',
    comment: 'comment',
    authorId: 'authorId',
    receiverId: 'receiverId',
    jobId: 'jobId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum]


  export const ConversationScalarFieldEnum: {
    id: 'id',
    participants: 'participants',
    jobId: 'jobId',
    projectName: 'projectName',
    isActive: 'isActive',
    lastMessageId: 'lastMessageId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ConversationScalarFieldEnum = (typeof ConversationScalarFieldEnum)[keyof typeof ConversationScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    content: 'content',
    senderEmail: 'senderEmail',
    receiverEmail: 'receiverEmail',
    conversationId: 'conversationId',
    isRead: 'isRead',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    title: 'title',
    message: 'message',
    type: 'type',
    isRead: 'isRead',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const SavedFreelancerScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    freelancerId: 'freelancerId',
    createdAt: 'createdAt'
  };

  export type SavedFreelancerScalarFieldEnum = (typeof SavedFreelancerScalarFieldEnum)[keyof typeof SavedFreelancerScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserType'
   */
  export type EnumUserTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserType'>
    


  /**
   * Reference to a field of type 'UserType[]'
   */
  export type ListEnumUserTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserType[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'BudgetType'
   */
  export type EnumBudgetTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BudgetType'>
    


  /**
   * Reference to a field of type 'BudgetType[]'
   */
  export type ListEnumBudgetTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BudgetType[]'>
    


  /**
   * Reference to a field of type 'JobStatus'
   */
  export type EnumJobStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JobStatus'>
    


  /**
   * Reference to a field of type 'JobStatus[]'
   */
  export type ListEnumJobStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JobStatus[]'>
    


  /**
   * Reference to a field of type 'ProposalStatus'
   */
  export type EnumProposalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProposalStatus'>
    


  /**
   * Reference to a field of type 'ProposalStatus[]'
   */
  export type ListEnumProposalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProposalStatus[]'>
    


  /**
   * Reference to a field of type 'NotificationType'
   */
  export type EnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType'>
    


  /**
   * Reference to a field of type 'NotificationType[]'
   */
  export type ListEnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    googleId?: StringNullableFilter<"User"> | string | null
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    avatar?: StringNullableFilter<"User"> | string | null
    bio?: StringNullableFilter<"User"> | string | null
    location?: StringNullableFilter<"User"> | string | null
    phone?: StringNullableFilter<"User"> | string | null
    userType?: EnumUserTypeFilter<"User"> | $Enums.UserType
    isOnboarded?: BoolFilter<"User"> | boolean
    onboardingStep?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    country?: StringNullableFilter<"User"> | string | null
    city?: StringNullableFilter<"User"> | string | null
    timezone?: StringNullableFilter<"User"> | string | null
    title?: StringNullableFilter<"User"> | string | null
    overview?: StringNullableFilter<"User"> | string | null
    skills?: JsonNullableFilter<"User">
    topSkills?: StringNullableListFilter<"User">
    serviceOfferings?: StringNullableListFilter<"User">
    hourlyRate?: FloatNullableFilter<"User"> | number | null
    portfolio?: StringNullableFilter<"User"> | string | null
    experience?: StringNullableFilter<"User"> | string | null
    education?: JsonNullableFilter<"User">
    workExperience?: JsonNullableFilter<"User">
    certifications?: StringNullableListFilter<"User">
    availability?: StringNullableFilter<"User"> | string | null
    languages?: JsonNullableFilter<"User">
    socialLinks?: JsonNullableFilter<"User">
    category?: StringNullableFilter<"User"> | string | null
    subcategory?: StringNullableFilter<"User"> | string | null
    experienceLevel?: StringNullableFilter<"User"> | string | null
    totalEarnings?: StringNullableFilter<"User"> | string | null
    successRate?: IntNullableFilter<"User"> | number | null
    completedJobs?: IntNullableFilter<"User"> | number | null
    onTime?: IntNullableFilter<"User"> | number | null
    onBudget?: IntNullableFilter<"User"> | number | null
    responseTime?: StringNullableFilter<"User"> | string | null
    lastActive?: StringNullableFilter<"User"> | string | null
    topRatedPlus?: BoolFilter<"User"> | boolean
    verified?: BoolFilter<"User"> | boolean
    risingTalent?: BoolFilter<"User"> | boolean
    portfolioItems?: JsonNullableFilter<"User">
    testScores?: JsonNullableFilter<"User">
    specializations?: StringNullableListFilter<"User">
    memberSince?: StringNullableFilter<"User"> | string | null
    profileStrength?: IntNullableFilter<"User"> | number | null
    repeatHireRate?: IntNullableFilter<"User"> | number | null
    rating?: FloatNullableFilter<"User"> | number | null
    reviewCount?: IntNullableFilter<"User"> | number | null
    portfolioProjects?: JsonNullableFilter<"User">
    workHistory?: JsonNullableFilter<"User">
    employmentHistory?: JsonNullableFilter<"User">
    coverImage?: StringNullableFilter<"User"> | string | null
    isOnline?: BoolFilter<"User"> | boolean
    hourlyRateRange?: StringNullableFilter<"User"> | string | null
    availabilityStatus?: StringNullableFilter<"User"> | string | null
    companyName?: StringNullableFilter<"User"> | string | null
    companySize?: StringNullableFilter<"User"> | string | null
    industry?: StringNullableFilter<"User"> | string | null
    companyWebsite?: StringNullableFilter<"User"> | string | null
    companyDescription?: StringNullableFilter<"User"> | string | null
    projectTypes?: StringNullableListFilter<"User">
    preferredSkills?: StringNullableListFilter<"User">
    budgetRange?: StringNullableFilter<"User"> | string | null
    clientType?: StringNullableFilter<"User"> | string | null
    howDidYouHear?: StringNullableFilter<"User"> | string | null
    interestedCategories?: StringNullableListFilter<"User">
    urgencyLevel?: StringNullableFilter<"User"> | string | null
    preferredWorkingStyle?: StringNullableFilter<"User"> | string | null
    communicationPreference?: StringNullableListFilter<"User">
    projectDescription?: StringNullableFilter<"User"> | string | null
    paymentPreference?: StringNullableFilter<"User"> | string | null
    projectFrequency?: StringNullableFilter<"User"> | string | null
    averageProjectDuration?: StringNullableFilter<"User"> | string | null
    maxHourlyRate?: StringNullableFilter<"User"> | string | null
    totalMonthlyBudget?: StringNullableFilter<"User"> | string | null
    projectBasedRates?: JsonNullableFilter<"User">
    hoursPerWeek?: StringNullableFilter<"User"> | string | null
    workingHours?: JsonNullableFilter<"User">
    workingDays?: StringNullableListFilter<"User">
    minimumProjectBudget?: StringNullableFilter<"User"> | string | null
    specialRequirements?: StringNullableFilter<"User"> | string | null
    idDocument?: StringNullableFilter<"User"> | string | null
    addressProof?: StringNullableFilter<"User"> | string | null
    taxInformation?: StringNullableFilter<"User"> | string | null
    phoneVerified?: BoolFilter<"User"> | boolean
    jobsPosted?: JobListRelationFilter
    proposals?: ProposalListRelationFilter
    reviews?: ReviewListRelationFilter
    receivedReviews?: ReviewListRelationFilter
    messages?: MessageListRelationFilter
    receivedMessages?: MessageListRelationFilter
    notifications?: NotificationListRelationFilter
    savedFreelancers?: SavedFreelancerListRelationFilter
    savedByUsers?: SavedFreelancerListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    googleId?: SortOrderInput | SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    avatar?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    userType?: SortOrder
    isOnboarded?: SortOrder
    onboardingStep?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    country?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    timezone?: SortOrderInput | SortOrder
    title?: SortOrderInput | SortOrder
    overview?: SortOrderInput | SortOrder
    skills?: SortOrderInput | SortOrder
    topSkills?: SortOrder
    serviceOfferings?: SortOrder
    hourlyRate?: SortOrderInput | SortOrder
    portfolio?: SortOrderInput | SortOrder
    experience?: SortOrderInput | SortOrder
    education?: SortOrderInput | SortOrder
    workExperience?: SortOrderInput | SortOrder
    certifications?: SortOrder
    availability?: SortOrderInput | SortOrder
    languages?: SortOrderInput | SortOrder
    socialLinks?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    subcategory?: SortOrderInput | SortOrder
    experienceLevel?: SortOrderInput | SortOrder
    totalEarnings?: SortOrderInput | SortOrder
    successRate?: SortOrderInput | SortOrder
    completedJobs?: SortOrderInput | SortOrder
    onTime?: SortOrderInput | SortOrder
    onBudget?: SortOrderInput | SortOrder
    responseTime?: SortOrderInput | SortOrder
    lastActive?: SortOrderInput | SortOrder
    topRatedPlus?: SortOrder
    verified?: SortOrder
    risingTalent?: SortOrder
    portfolioItems?: SortOrderInput | SortOrder
    testScores?: SortOrderInput | SortOrder
    specializations?: SortOrder
    memberSince?: SortOrderInput | SortOrder
    profileStrength?: SortOrderInput | SortOrder
    repeatHireRate?: SortOrderInput | SortOrder
    rating?: SortOrderInput | SortOrder
    reviewCount?: SortOrderInput | SortOrder
    portfolioProjects?: SortOrderInput | SortOrder
    workHistory?: SortOrderInput | SortOrder
    employmentHistory?: SortOrderInput | SortOrder
    coverImage?: SortOrderInput | SortOrder
    isOnline?: SortOrder
    hourlyRateRange?: SortOrderInput | SortOrder
    availabilityStatus?: SortOrderInput | SortOrder
    companyName?: SortOrderInput | SortOrder
    companySize?: SortOrderInput | SortOrder
    industry?: SortOrderInput | SortOrder
    companyWebsite?: SortOrderInput | SortOrder
    companyDescription?: SortOrderInput | SortOrder
    projectTypes?: SortOrder
    preferredSkills?: SortOrder
    budgetRange?: SortOrderInput | SortOrder
    clientType?: SortOrderInput | SortOrder
    howDidYouHear?: SortOrderInput | SortOrder
    interestedCategories?: SortOrder
    urgencyLevel?: SortOrderInput | SortOrder
    preferredWorkingStyle?: SortOrderInput | SortOrder
    communicationPreference?: SortOrder
    projectDescription?: SortOrderInput | SortOrder
    paymentPreference?: SortOrderInput | SortOrder
    projectFrequency?: SortOrderInput | SortOrder
    averageProjectDuration?: SortOrderInput | SortOrder
    maxHourlyRate?: SortOrderInput | SortOrder
    totalMonthlyBudget?: SortOrderInput | SortOrder
    projectBasedRates?: SortOrderInput | SortOrder
    hoursPerWeek?: SortOrderInput | SortOrder
    workingHours?: SortOrderInput | SortOrder
    workingDays?: SortOrder
    minimumProjectBudget?: SortOrderInput | SortOrder
    specialRequirements?: SortOrderInput | SortOrder
    idDocument?: SortOrderInput | SortOrder
    addressProof?: SortOrderInput | SortOrder
    taxInformation?: SortOrderInput | SortOrder
    phoneVerified?: SortOrder
    jobsPosted?: JobOrderByRelationAggregateInput
    proposals?: ProposalOrderByRelationAggregateInput
    reviews?: ReviewOrderByRelationAggregateInput
    receivedReviews?: ReviewOrderByRelationAggregateInput
    messages?: MessageOrderByRelationAggregateInput
    receivedMessages?: MessageOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
    savedFreelancers?: SavedFreelancerOrderByRelationAggregateInput
    savedByUsers?: SavedFreelancerOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    googleId?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    avatar?: StringNullableFilter<"User"> | string | null
    bio?: StringNullableFilter<"User"> | string | null
    location?: StringNullableFilter<"User"> | string | null
    phone?: StringNullableFilter<"User"> | string | null
    userType?: EnumUserTypeFilter<"User"> | $Enums.UserType
    isOnboarded?: BoolFilter<"User"> | boolean
    onboardingStep?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    country?: StringNullableFilter<"User"> | string | null
    city?: StringNullableFilter<"User"> | string | null
    timezone?: StringNullableFilter<"User"> | string | null
    title?: StringNullableFilter<"User"> | string | null
    overview?: StringNullableFilter<"User"> | string | null
    skills?: JsonNullableFilter<"User">
    topSkills?: StringNullableListFilter<"User">
    serviceOfferings?: StringNullableListFilter<"User">
    hourlyRate?: FloatNullableFilter<"User"> | number | null
    portfolio?: StringNullableFilter<"User"> | string | null
    experience?: StringNullableFilter<"User"> | string | null
    education?: JsonNullableFilter<"User">
    workExperience?: JsonNullableFilter<"User">
    certifications?: StringNullableListFilter<"User">
    availability?: StringNullableFilter<"User"> | string | null
    languages?: JsonNullableFilter<"User">
    socialLinks?: JsonNullableFilter<"User">
    category?: StringNullableFilter<"User"> | string | null
    subcategory?: StringNullableFilter<"User"> | string | null
    experienceLevel?: StringNullableFilter<"User"> | string | null
    totalEarnings?: StringNullableFilter<"User"> | string | null
    successRate?: IntNullableFilter<"User"> | number | null
    completedJobs?: IntNullableFilter<"User"> | number | null
    onTime?: IntNullableFilter<"User"> | number | null
    onBudget?: IntNullableFilter<"User"> | number | null
    responseTime?: StringNullableFilter<"User"> | string | null
    lastActive?: StringNullableFilter<"User"> | string | null
    topRatedPlus?: BoolFilter<"User"> | boolean
    verified?: BoolFilter<"User"> | boolean
    risingTalent?: BoolFilter<"User"> | boolean
    portfolioItems?: JsonNullableFilter<"User">
    testScores?: JsonNullableFilter<"User">
    specializations?: StringNullableListFilter<"User">
    memberSince?: StringNullableFilter<"User"> | string | null
    profileStrength?: IntNullableFilter<"User"> | number | null
    repeatHireRate?: IntNullableFilter<"User"> | number | null
    rating?: FloatNullableFilter<"User"> | number | null
    reviewCount?: IntNullableFilter<"User"> | number | null
    portfolioProjects?: JsonNullableFilter<"User">
    workHistory?: JsonNullableFilter<"User">
    employmentHistory?: JsonNullableFilter<"User">
    coverImage?: StringNullableFilter<"User"> | string | null
    isOnline?: BoolFilter<"User"> | boolean
    hourlyRateRange?: StringNullableFilter<"User"> | string | null
    availabilityStatus?: StringNullableFilter<"User"> | string | null
    companyName?: StringNullableFilter<"User"> | string | null
    companySize?: StringNullableFilter<"User"> | string | null
    industry?: StringNullableFilter<"User"> | string | null
    companyWebsite?: StringNullableFilter<"User"> | string | null
    companyDescription?: StringNullableFilter<"User"> | string | null
    projectTypes?: StringNullableListFilter<"User">
    preferredSkills?: StringNullableListFilter<"User">
    budgetRange?: StringNullableFilter<"User"> | string | null
    clientType?: StringNullableFilter<"User"> | string | null
    howDidYouHear?: StringNullableFilter<"User"> | string | null
    interestedCategories?: StringNullableListFilter<"User">
    urgencyLevel?: StringNullableFilter<"User"> | string | null
    preferredWorkingStyle?: StringNullableFilter<"User"> | string | null
    communicationPreference?: StringNullableListFilter<"User">
    projectDescription?: StringNullableFilter<"User"> | string | null
    paymentPreference?: StringNullableFilter<"User"> | string | null
    projectFrequency?: StringNullableFilter<"User"> | string | null
    averageProjectDuration?: StringNullableFilter<"User"> | string | null
    maxHourlyRate?: StringNullableFilter<"User"> | string | null
    totalMonthlyBudget?: StringNullableFilter<"User"> | string | null
    projectBasedRates?: JsonNullableFilter<"User">
    hoursPerWeek?: StringNullableFilter<"User"> | string | null
    workingHours?: JsonNullableFilter<"User">
    workingDays?: StringNullableListFilter<"User">
    minimumProjectBudget?: StringNullableFilter<"User"> | string | null
    specialRequirements?: StringNullableFilter<"User"> | string | null
    idDocument?: StringNullableFilter<"User"> | string | null
    addressProof?: StringNullableFilter<"User"> | string | null
    taxInformation?: StringNullableFilter<"User"> | string | null
    phoneVerified?: BoolFilter<"User"> | boolean
    jobsPosted?: JobListRelationFilter
    proposals?: ProposalListRelationFilter
    reviews?: ReviewListRelationFilter
    receivedReviews?: ReviewListRelationFilter
    messages?: MessageListRelationFilter
    receivedMessages?: MessageListRelationFilter
    notifications?: NotificationListRelationFilter
    savedFreelancers?: SavedFreelancerListRelationFilter
    savedByUsers?: SavedFreelancerListRelationFilter
  }, "id" | "googleId" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    googleId?: SortOrderInput | SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    avatar?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    userType?: SortOrder
    isOnboarded?: SortOrder
    onboardingStep?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    country?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    timezone?: SortOrderInput | SortOrder
    title?: SortOrderInput | SortOrder
    overview?: SortOrderInput | SortOrder
    skills?: SortOrderInput | SortOrder
    topSkills?: SortOrder
    serviceOfferings?: SortOrder
    hourlyRate?: SortOrderInput | SortOrder
    portfolio?: SortOrderInput | SortOrder
    experience?: SortOrderInput | SortOrder
    education?: SortOrderInput | SortOrder
    workExperience?: SortOrderInput | SortOrder
    certifications?: SortOrder
    availability?: SortOrderInput | SortOrder
    languages?: SortOrderInput | SortOrder
    socialLinks?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    subcategory?: SortOrderInput | SortOrder
    experienceLevel?: SortOrderInput | SortOrder
    totalEarnings?: SortOrderInput | SortOrder
    successRate?: SortOrderInput | SortOrder
    completedJobs?: SortOrderInput | SortOrder
    onTime?: SortOrderInput | SortOrder
    onBudget?: SortOrderInput | SortOrder
    responseTime?: SortOrderInput | SortOrder
    lastActive?: SortOrderInput | SortOrder
    topRatedPlus?: SortOrder
    verified?: SortOrder
    risingTalent?: SortOrder
    portfolioItems?: SortOrderInput | SortOrder
    testScores?: SortOrderInput | SortOrder
    specializations?: SortOrder
    memberSince?: SortOrderInput | SortOrder
    profileStrength?: SortOrderInput | SortOrder
    repeatHireRate?: SortOrderInput | SortOrder
    rating?: SortOrderInput | SortOrder
    reviewCount?: SortOrderInput | SortOrder
    portfolioProjects?: SortOrderInput | SortOrder
    workHistory?: SortOrderInput | SortOrder
    employmentHistory?: SortOrderInput | SortOrder
    coverImage?: SortOrderInput | SortOrder
    isOnline?: SortOrder
    hourlyRateRange?: SortOrderInput | SortOrder
    availabilityStatus?: SortOrderInput | SortOrder
    companyName?: SortOrderInput | SortOrder
    companySize?: SortOrderInput | SortOrder
    industry?: SortOrderInput | SortOrder
    companyWebsite?: SortOrderInput | SortOrder
    companyDescription?: SortOrderInput | SortOrder
    projectTypes?: SortOrder
    preferredSkills?: SortOrder
    budgetRange?: SortOrderInput | SortOrder
    clientType?: SortOrderInput | SortOrder
    howDidYouHear?: SortOrderInput | SortOrder
    interestedCategories?: SortOrder
    urgencyLevel?: SortOrderInput | SortOrder
    preferredWorkingStyle?: SortOrderInput | SortOrder
    communicationPreference?: SortOrder
    projectDescription?: SortOrderInput | SortOrder
    paymentPreference?: SortOrderInput | SortOrder
    projectFrequency?: SortOrderInput | SortOrder
    averageProjectDuration?: SortOrderInput | SortOrder
    maxHourlyRate?: SortOrderInput | SortOrder
    totalMonthlyBudget?: SortOrderInput | SortOrder
    projectBasedRates?: SortOrderInput | SortOrder
    hoursPerWeek?: SortOrderInput | SortOrder
    workingHours?: SortOrderInput | SortOrder
    workingDays?: SortOrder
    minimumProjectBudget?: SortOrderInput | SortOrder
    specialRequirements?: SortOrderInput | SortOrder
    idDocument?: SortOrderInput | SortOrder
    addressProof?: SortOrderInput | SortOrder
    taxInformation?: SortOrderInput | SortOrder
    phoneVerified?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    googleId?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringWithAggregatesFilter<"User"> | string
    avatar?: StringNullableWithAggregatesFilter<"User"> | string | null
    bio?: StringNullableWithAggregatesFilter<"User"> | string | null
    location?: StringNullableWithAggregatesFilter<"User"> | string | null
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    userType?: EnumUserTypeWithAggregatesFilter<"User"> | $Enums.UserType
    isOnboarded?: BoolWithAggregatesFilter<"User"> | boolean
    onboardingStep?: IntWithAggregatesFilter<"User"> | number
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    country?: StringNullableWithAggregatesFilter<"User"> | string | null
    city?: StringNullableWithAggregatesFilter<"User"> | string | null
    timezone?: StringNullableWithAggregatesFilter<"User"> | string | null
    title?: StringNullableWithAggregatesFilter<"User"> | string | null
    overview?: StringNullableWithAggregatesFilter<"User"> | string | null
    skills?: JsonNullableWithAggregatesFilter<"User">
    topSkills?: StringNullableListFilter<"User">
    serviceOfferings?: StringNullableListFilter<"User">
    hourlyRate?: FloatNullableWithAggregatesFilter<"User"> | number | null
    portfolio?: StringNullableWithAggregatesFilter<"User"> | string | null
    experience?: StringNullableWithAggregatesFilter<"User"> | string | null
    education?: JsonNullableWithAggregatesFilter<"User">
    workExperience?: JsonNullableWithAggregatesFilter<"User">
    certifications?: StringNullableListFilter<"User">
    availability?: StringNullableWithAggregatesFilter<"User"> | string | null
    languages?: JsonNullableWithAggregatesFilter<"User">
    socialLinks?: JsonNullableWithAggregatesFilter<"User">
    category?: StringNullableWithAggregatesFilter<"User"> | string | null
    subcategory?: StringNullableWithAggregatesFilter<"User"> | string | null
    experienceLevel?: StringNullableWithAggregatesFilter<"User"> | string | null
    totalEarnings?: StringNullableWithAggregatesFilter<"User"> | string | null
    successRate?: IntNullableWithAggregatesFilter<"User"> | number | null
    completedJobs?: IntNullableWithAggregatesFilter<"User"> | number | null
    onTime?: IntNullableWithAggregatesFilter<"User"> | number | null
    onBudget?: IntNullableWithAggregatesFilter<"User"> | number | null
    responseTime?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastActive?: StringNullableWithAggregatesFilter<"User"> | string | null
    topRatedPlus?: BoolWithAggregatesFilter<"User"> | boolean
    verified?: BoolWithAggregatesFilter<"User"> | boolean
    risingTalent?: BoolWithAggregatesFilter<"User"> | boolean
    portfolioItems?: JsonNullableWithAggregatesFilter<"User">
    testScores?: JsonNullableWithAggregatesFilter<"User">
    specializations?: StringNullableListFilter<"User">
    memberSince?: StringNullableWithAggregatesFilter<"User"> | string | null
    profileStrength?: IntNullableWithAggregatesFilter<"User"> | number | null
    repeatHireRate?: IntNullableWithAggregatesFilter<"User"> | number | null
    rating?: FloatNullableWithAggregatesFilter<"User"> | number | null
    reviewCount?: IntNullableWithAggregatesFilter<"User"> | number | null
    portfolioProjects?: JsonNullableWithAggregatesFilter<"User">
    workHistory?: JsonNullableWithAggregatesFilter<"User">
    employmentHistory?: JsonNullableWithAggregatesFilter<"User">
    coverImage?: StringNullableWithAggregatesFilter<"User"> | string | null
    isOnline?: BoolWithAggregatesFilter<"User"> | boolean
    hourlyRateRange?: StringNullableWithAggregatesFilter<"User"> | string | null
    availabilityStatus?: StringNullableWithAggregatesFilter<"User"> | string | null
    companyName?: StringNullableWithAggregatesFilter<"User"> | string | null
    companySize?: StringNullableWithAggregatesFilter<"User"> | string | null
    industry?: StringNullableWithAggregatesFilter<"User"> | string | null
    companyWebsite?: StringNullableWithAggregatesFilter<"User"> | string | null
    companyDescription?: StringNullableWithAggregatesFilter<"User"> | string | null
    projectTypes?: StringNullableListFilter<"User">
    preferredSkills?: StringNullableListFilter<"User">
    budgetRange?: StringNullableWithAggregatesFilter<"User"> | string | null
    clientType?: StringNullableWithAggregatesFilter<"User"> | string | null
    howDidYouHear?: StringNullableWithAggregatesFilter<"User"> | string | null
    interestedCategories?: StringNullableListFilter<"User">
    urgencyLevel?: StringNullableWithAggregatesFilter<"User"> | string | null
    preferredWorkingStyle?: StringNullableWithAggregatesFilter<"User"> | string | null
    communicationPreference?: StringNullableListFilter<"User">
    projectDescription?: StringNullableWithAggregatesFilter<"User"> | string | null
    paymentPreference?: StringNullableWithAggregatesFilter<"User"> | string | null
    projectFrequency?: StringNullableWithAggregatesFilter<"User"> | string | null
    averageProjectDuration?: StringNullableWithAggregatesFilter<"User"> | string | null
    maxHourlyRate?: StringNullableWithAggregatesFilter<"User"> | string | null
    totalMonthlyBudget?: StringNullableWithAggregatesFilter<"User"> | string | null
    projectBasedRates?: JsonNullableWithAggregatesFilter<"User">
    hoursPerWeek?: StringNullableWithAggregatesFilter<"User"> | string | null
    workingHours?: JsonNullableWithAggregatesFilter<"User">
    workingDays?: StringNullableListFilter<"User">
    minimumProjectBudget?: StringNullableWithAggregatesFilter<"User"> | string | null
    specialRequirements?: StringNullableWithAggregatesFilter<"User"> | string | null
    idDocument?: StringNullableWithAggregatesFilter<"User"> | string | null
    addressProof?: StringNullableWithAggregatesFilter<"User"> | string | null
    taxInformation?: StringNullableWithAggregatesFilter<"User"> | string | null
    phoneVerified?: BoolWithAggregatesFilter<"User"> | boolean
  }

  export type JobWhereInput = {
    AND?: JobWhereInput | JobWhereInput[]
    OR?: JobWhereInput[]
    NOT?: JobWhereInput | JobWhereInput[]
    id?: StringFilter<"Job"> | string
    title?: StringFilter<"Job"> | string
    description?: StringFilter<"Job"> | string
    requirements?: StringNullableListFilter<"Job">
    budget?: EnumBudgetTypeFilter<"Job"> | $Enums.BudgetType
    minBudget?: FloatNullableFilter<"Job"> | number | null
    maxBudget?: FloatNullableFilter<"Job"> | number | null
    hourlyRate?: FloatNullableFilter<"Job"> | number | null
    duration?: StringNullableFilter<"Job"> | string | null
    skills?: StringNullableListFilter<"Job">
    category?: StringFilter<"Job"> | string
    subcategory?: StringNullableFilter<"Job"> | string | null
    projectType?: StringNullableFilter<"Job"> | string | null
    experienceLevel?: StringNullableFilter<"Job"> | string | null
    workingHours?: StringNullableFilter<"Job"> | string | null
    timezone?: StringNullableFilter<"Job"> | string | null
    communicationPreferences?: StringNullableListFilter<"Job">
    location?: StringNullableFilter<"Job"> | string | null
    isRemote?: BoolFilter<"Job"> | boolean
    status?: EnumJobStatusFilter<"Job"> | $Enums.JobStatus
    isUrgent?: BoolFilter<"Job"> | boolean
    visibility?: StringFilter<"Job"> | string
    applicationDeadline?: DateTimeNullableFilter<"Job"> | Date | string | null
    clientId?: StringFilter<"Job"> | string
    createdAt?: DateTimeFilter<"Job"> | Date | string
    updatedAt?: DateTimeFilter<"Job"> | Date | string
    conversation?: ConversationListRelationFilter
    client?: XOR<UserScalarRelationFilter, UserWhereInput>
    proposals?: ProposalListRelationFilter
    reviews?: ReviewListRelationFilter
  }

  export type JobOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    requirements?: SortOrder
    budget?: SortOrder
    minBudget?: SortOrderInput | SortOrder
    maxBudget?: SortOrderInput | SortOrder
    hourlyRate?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    skills?: SortOrder
    category?: SortOrder
    subcategory?: SortOrderInput | SortOrder
    projectType?: SortOrderInput | SortOrder
    experienceLevel?: SortOrderInput | SortOrder
    workingHours?: SortOrderInput | SortOrder
    timezone?: SortOrderInput | SortOrder
    communicationPreferences?: SortOrder
    location?: SortOrderInput | SortOrder
    isRemote?: SortOrder
    status?: SortOrder
    isUrgent?: SortOrder
    visibility?: SortOrder
    applicationDeadline?: SortOrderInput | SortOrder
    clientId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    conversation?: ConversationOrderByRelationAggregateInput
    client?: UserOrderByWithRelationInput
    proposals?: ProposalOrderByRelationAggregateInput
    reviews?: ReviewOrderByRelationAggregateInput
  }

  export type JobWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: JobWhereInput | JobWhereInput[]
    OR?: JobWhereInput[]
    NOT?: JobWhereInput | JobWhereInput[]
    title?: StringFilter<"Job"> | string
    description?: StringFilter<"Job"> | string
    requirements?: StringNullableListFilter<"Job">
    budget?: EnumBudgetTypeFilter<"Job"> | $Enums.BudgetType
    minBudget?: FloatNullableFilter<"Job"> | number | null
    maxBudget?: FloatNullableFilter<"Job"> | number | null
    hourlyRate?: FloatNullableFilter<"Job"> | number | null
    duration?: StringNullableFilter<"Job"> | string | null
    skills?: StringNullableListFilter<"Job">
    category?: StringFilter<"Job"> | string
    subcategory?: StringNullableFilter<"Job"> | string | null
    projectType?: StringNullableFilter<"Job"> | string | null
    experienceLevel?: StringNullableFilter<"Job"> | string | null
    workingHours?: StringNullableFilter<"Job"> | string | null
    timezone?: StringNullableFilter<"Job"> | string | null
    communicationPreferences?: StringNullableListFilter<"Job">
    location?: StringNullableFilter<"Job"> | string | null
    isRemote?: BoolFilter<"Job"> | boolean
    status?: EnumJobStatusFilter<"Job"> | $Enums.JobStatus
    isUrgent?: BoolFilter<"Job"> | boolean
    visibility?: StringFilter<"Job"> | string
    applicationDeadline?: DateTimeNullableFilter<"Job"> | Date | string | null
    clientId?: StringFilter<"Job"> | string
    createdAt?: DateTimeFilter<"Job"> | Date | string
    updatedAt?: DateTimeFilter<"Job"> | Date | string
    conversation?: ConversationListRelationFilter
    client?: XOR<UserScalarRelationFilter, UserWhereInput>
    proposals?: ProposalListRelationFilter
    reviews?: ReviewListRelationFilter
  }, "id">

  export type JobOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    requirements?: SortOrder
    budget?: SortOrder
    minBudget?: SortOrderInput | SortOrder
    maxBudget?: SortOrderInput | SortOrder
    hourlyRate?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    skills?: SortOrder
    category?: SortOrder
    subcategory?: SortOrderInput | SortOrder
    projectType?: SortOrderInput | SortOrder
    experienceLevel?: SortOrderInput | SortOrder
    workingHours?: SortOrderInput | SortOrder
    timezone?: SortOrderInput | SortOrder
    communicationPreferences?: SortOrder
    location?: SortOrderInput | SortOrder
    isRemote?: SortOrder
    status?: SortOrder
    isUrgent?: SortOrder
    visibility?: SortOrder
    applicationDeadline?: SortOrderInput | SortOrder
    clientId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: JobCountOrderByAggregateInput
    _avg?: JobAvgOrderByAggregateInput
    _max?: JobMaxOrderByAggregateInput
    _min?: JobMinOrderByAggregateInput
    _sum?: JobSumOrderByAggregateInput
  }

  export type JobScalarWhereWithAggregatesInput = {
    AND?: JobScalarWhereWithAggregatesInput | JobScalarWhereWithAggregatesInput[]
    OR?: JobScalarWhereWithAggregatesInput[]
    NOT?: JobScalarWhereWithAggregatesInput | JobScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Job"> | string
    title?: StringWithAggregatesFilter<"Job"> | string
    description?: StringWithAggregatesFilter<"Job"> | string
    requirements?: StringNullableListFilter<"Job">
    budget?: EnumBudgetTypeWithAggregatesFilter<"Job"> | $Enums.BudgetType
    minBudget?: FloatNullableWithAggregatesFilter<"Job"> | number | null
    maxBudget?: FloatNullableWithAggregatesFilter<"Job"> | number | null
    hourlyRate?: FloatNullableWithAggregatesFilter<"Job"> | number | null
    duration?: StringNullableWithAggregatesFilter<"Job"> | string | null
    skills?: StringNullableListFilter<"Job">
    category?: StringWithAggregatesFilter<"Job"> | string
    subcategory?: StringNullableWithAggregatesFilter<"Job"> | string | null
    projectType?: StringNullableWithAggregatesFilter<"Job"> | string | null
    experienceLevel?: StringNullableWithAggregatesFilter<"Job"> | string | null
    workingHours?: StringNullableWithAggregatesFilter<"Job"> | string | null
    timezone?: StringNullableWithAggregatesFilter<"Job"> | string | null
    communicationPreferences?: StringNullableListFilter<"Job">
    location?: StringNullableWithAggregatesFilter<"Job"> | string | null
    isRemote?: BoolWithAggregatesFilter<"Job"> | boolean
    status?: EnumJobStatusWithAggregatesFilter<"Job"> | $Enums.JobStatus
    isUrgent?: BoolWithAggregatesFilter<"Job"> | boolean
    visibility?: StringWithAggregatesFilter<"Job"> | string
    applicationDeadline?: DateTimeNullableWithAggregatesFilter<"Job"> | Date | string | null
    clientId?: StringWithAggregatesFilter<"Job"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Job"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Job"> | Date | string
  }

  export type ProposalWhereInput = {
    AND?: ProposalWhereInput | ProposalWhereInput[]
    OR?: ProposalWhereInput[]
    NOT?: ProposalWhereInput | ProposalWhereInput[]
    id?: StringFilter<"Proposal"> | string
    coverLetter?: StringFilter<"Proposal"> | string
    bidAmount?: FloatFilter<"Proposal"> | number
    estimatedDuration?: StringFilter<"Proposal"> | string
    attachments?: StringNullableListFilter<"Proposal">
    status?: EnumProposalStatusFilter<"Proposal"> | $Enums.ProposalStatus
    jobId?: StringFilter<"Proposal"> | string
    freelancerId?: StringFilter<"Proposal"> | string
    createdAt?: DateTimeFilter<"Proposal"> | Date | string
    updatedAt?: DateTimeFilter<"Proposal"> | Date | string
    questionResponses?: JsonNullableFilter<"Proposal">
    milestones?: JsonNullableFilter<"Proposal">
    clientNotes?: StringNullableFilter<"Proposal"> | string | null
    clientViewed?: BoolFilter<"Proposal"> | boolean
    rating?: IntNullableFilter<"Proposal"> | number | null
    interview?: JsonNullableFilter<"Proposal">
    originalBudget?: FloatNullableFilter<"Proposal"> | number | null
    isShortlisted?: BoolFilter<"Proposal"> | boolean
    job?: XOR<JobScalarRelationFilter, JobWhereInput>
    freelancer?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ProposalOrderByWithRelationInput = {
    id?: SortOrder
    coverLetter?: SortOrder
    bidAmount?: SortOrder
    estimatedDuration?: SortOrder
    attachments?: SortOrder
    status?: SortOrder
    jobId?: SortOrder
    freelancerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    questionResponses?: SortOrderInput | SortOrder
    milestones?: SortOrderInput | SortOrder
    clientNotes?: SortOrderInput | SortOrder
    clientViewed?: SortOrder
    rating?: SortOrderInput | SortOrder
    interview?: SortOrderInput | SortOrder
    originalBudget?: SortOrderInput | SortOrder
    isShortlisted?: SortOrder
    job?: JobOrderByWithRelationInput
    freelancer?: UserOrderByWithRelationInput
  }

  export type ProposalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProposalWhereInput | ProposalWhereInput[]
    OR?: ProposalWhereInput[]
    NOT?: ProposalWhereInput | ProposalWhereInput[]
    coverLetter?: StringFilter<"Proposal"> | string
    bidAmount?: FloatFilter<"Proposal"> | number
    estimatedDuration?: StringFilter<"Proposal"> | string
    attachments?: StringNullableListFilter<"Proposal">
    status?: EnumProposalStatusFilter<"Proposal"> | $Enums.ProposalStatus
    jobId?: StringFilter<"Proposal"> | string
    freelancerId?: StringFilter<"Proposal"> | string
    createdAt?: DateTimeFilter<"Proposal"> | Date | string
    updatedAt?: DateTimeFilter<"Proposal"> | Date | string
    questionResponses?: JsonNullableFilter<"Proposal">
    milestones?: JsonNullableFilter<"Proposal">
    clientNotes?: StringNullableFilter<"Proposal"> | string | null
    clientViewed?: BoolFilter<"Proposal"> | boolean
    rating?: IntNullableFilter<"Proposal"> | number | null
    interview?: JsonNullableFilter<"Proposal">
    originalBudget?: FloatNullableFilter<"Proposal"> | number | null
    isShortlisted?: BoolFilter<"Proposal"> | boolean
    job?: XOR<JobScalarRelationFilter, JobWhereInput>
    freelancer?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ProposalOrderByWithAggregationInput = {
    id?: SortOrder
    coverLetter?: SortOrder
    bidAmount?: SortOrder
    estimatedDuration?: SortOrder
    attachments?: SortOrder
    status?: SortOrder
    jobId?: SortOrder
    freelancerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    questionResponses?: SortOrderInput | SortOrder
    milestones?: SortOrderInput | SortOrder
    clientNotes?: SortOrderInput | SortOrder
    clientViewed?: SortOrder
    rating?: SortOrderInput | SortOrder
    interview?: SortOrderInput | SortOrder
    originalBudget?: SortOrderInput | SortOrder
    isShortlisted?: SortOrder
    _count?: ProposalCountOrderByAggregateInput
    _avg?: ProposalAvgOrderByAggregateInput
    _max?: ProposalMaxOrderByAggregateInput
    _min?: ProposalMinOrderByAggregateInput
    _sum?: ProposalSumOrderByAggregateInput
  }

  export type ProposalScalarWhereWithAggregatesInput = {
    AND?: ProposalScalarWhereWithAggregatesInput | ProposalScalarWhereWithAggregatesInput[]
    OR?: ProposalScalarWhereWithAggregatesInput[]
    NOT?: ProposalScalarWhereWithAggregatesInput | ProposalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Proposal"> | string
    coverLetter?: StringWithAggregatesFilter<"Proposal"> | string
    bidAmount?: FloatWithAggregatesFilter<"Proposal"> | number
    estimatedDuration?: StringWithAggregatesFilter<"Proposal"> | string
    attachments?: StringNullableListFilter<"Proposal">
    status?: EnumProposalStatusWithAggregatesFilter<"Proposal"> | $Enums.ProposalStatus
    jobId?: StringWithAggregatesFilter<"Proposal"> | string
    freelancerId?: StringWithAggregatesFilter<"Proposal"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Proposal"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Proposal"> | Date | string
    questionResponses?: JsonNullableWithAggregatesFilter<"Proposal">
    milestones?: JsonNullableWithAggregatesFilter<"Proposal">
    clientNotes?: StringNullableWithAggregatesFilter<"Proposal"> | string | null
    clientViewed?: BoolWithAggregatesFilter<"Proposal"> | boolean
    rating?: IntNullableWithAggregatesFilter<"Proposal"> | number | null
    interview?: JsonNullableWithAggregatesFilter<"Proposal">
    originalBudget?: FloatNullableWithAggregatesFilter<"Proposal"> | number | null
    isShortlisted?: BoolWithAggregatesFilter<"Proposal"> | boolean
  }

  export type ReviewWhereInput = {
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    id?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    comment?: StringFilter<"Review"> | string
    authorId?: StringFilter<"Review"> | string
    receiverId?: StringFilter<"Review"> | string
    jobId?: StringNullableFilter<"Review"> | string | null
    createdAt?: DateTimeFilter<"Review"> | Date | string
    updatedAt?: DateTimeFilter<"Review"> | Date | string
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    receiver?: XOR<UserScalarRelationFilter, UserWhereInput>
    job?: XOR<JobNullableScalarRelationFilter, JobWhereInput> | null
  }

  export type ReviewOrderByWithRelationInput = {
    id?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    authorId?: SortOrder
    receiverId?: SortOrder
    jobId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    author?: UserOrderByWithRelationInput
    receiver?: UserOrderByWithRelationInput
    job?: JobOrderByWithRelationInput
  }

  export type ReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    rating?: IntFilter<"Review"> | number
    comment?: StringFilter<"Review"> | string
    authorId?: StringFilter<"Review"> | string
    receiverId?: StringFilter<"Review"> | string
    jobId?: StringNullableFilter<"Review"> | string | null
    createdAt?: DateTimeFilter<"Review"> | Date | string
    updatedAt?: DateTimeFilter<"Review"> | Date | string
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    receiver?: XOR<UserScalarRelationFilter, UserWhereInput>
    job?: XOR<JobNullableScalarRelationFilter, JobWhereInput> | null
  }, "id">

  export type ReviewOrderByWithAggregationInput = {
    id?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    authorId?: SortOrder
    receiverId?: SortOrder
    jobId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ReviewCountOrderByAggregateInput
    _avg?: ReviewAvgOrderByAggregateInput
    _max?: ReviewMaxOrderByAggregateInput
    _min?: ReviewMinOrderByAggregateInput
    _sum?: ReviewSumOrderByAggregateInput
  }

  export type ReviewScalarWhereWithAggregatesInput = {
    AND?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    OR?: ReviewScalarWhereWithAggregatesInput[]
    NOT?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Review"> | string
    rating?: IntWithAggregatesFilter<"Review"> | number
    comment?: StringWithAggregatesFilter<"Review"> | string
    authorId?: StringWithAggregatesFilter<"Review"> | string
    receiverId?: StringWithAggregatesFilter<"Review"> | string
    jobId?: StringNullableWithAggregatesFilter<"Review"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Review"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Review"> | Date | string
  }

  export type ConversationWhereInput = {
    AND?: ConversationWhereInput | ConversationWhereInput[]
    OR?: ConversationWhereInput[]
    NOT?: ConversationWhereInput | ConversationWhereInput[]
    id?: StringFilter<"Conversation"> | string
    participants?: StringNullableListFilter<"Conversation">
    jobId?: StringNullableFilter<"Conversation"> | string | null
    projectName?: StringNullableFilter<"Conversation"> | string | null
    isActive?: BoolFilter<"Conversation"> | boolean
    lastMessageId?: StringNullableFilter<"Conversation"> | string | null
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
    job?: XOR<JobNullableScalarRelationFilter, JobWhereInput> | null
    messages?: MessageListRelationFilter
    lastMessage?: XOR<MessageNullableScalarRelationFilter, MessageWhereInput> | null
  }

  export type ConversationOrderByWithRelationInput = {
    id?: SortOrder
    participants?: SortOrder
    jobId?: SortOrderInput | SortOrder
    projectName?: SortOrderInput | SortOrder
    isActive?: SortOrder
    lastMessageId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    job?: JobOrderByWithRelationInput
    messages?: MessageOrderByRelationAggregateInput
    lastMessage?: MessageOrderByWithRelationInput
  }

  export type ConversationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ConversationWhereInput | ConversationWhereInput[]
    OR?: ConversationWhereInput[]
    NOT?: ConversationWhereInput | ConversationWhereInput[]
    participants?: StringNullableListFilter<"Conversation">
    jobId?: StringNullableFilter<"Conversation"> | string | null
    projectName?: StringNullableFilter<"Conversation"> | string | null
    isActive?: BoolFilter<"Conversation"> | boolean
    lastMessageId?: StringNullableFilter<"Conversation"> | string | null
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
    job?: XOR<JobNullableScalarRelationFilter, JobWhereInput> | null
    messages?: MessageListRelationFilter
    lastMessage?: XOR<MessageNullableScalarRelationFilter, MessageWhereInput> | null
  }, "id">

  export type ConversationOrderByWithAggregationInput = {
    id?: SortOrder
    participants?: SortOrder
    jobId?: SortOrderInput | SortOrder
    projectName?: SortOrderInput | SortOrder
    isActive?: SortOrder
    lastMessageId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ConversationCountOrderByAggregateInput
    _max?: ConversationMaxOrderByAggregateInput
    _min?: ConversationMinOrderByAggregateInput
  }

  export type ConversationScalarWhereWithAggregatesInput = {
    AND?: ConversationScalarWhereWithAggregatesInput | ConversationScalarWhereWithAggregatesInput[]
    OR?: ConversationScalarWhereWithAggregatesInput[]
    NOT?: ConversationScalarWhereWithAggregatesInput | ConversationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Conversation"> | string
    participants?: StringNullableListFilter<"Conversation">
    jobId?: StringNullableWithAggregatesFilter<"Conversation"> | string | null
    projectName?: StringNullableWithAggregatesFilter<"Conversation"> | string | null
    isActive?: BoolWithAggregatesFilter<"Conversation"> | boolean
    lastMessageId?: StringNullableWithAggregatesFilter<"Conversation"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Conversation"> | Date | string
  }

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    senderEmail?: StringFilter<"Message"> | string
    receiverEmail?: StringFilter<"Message"> | string
    conversationId?: StringFilter<"Message"> | string
    isRead?: BoolFilter<"Message"> | boolean
    createdAt?: DateTimeFilter<"Message"> | Date | string
    updatedAt?: DateTimeFilter<"Message"> | Date | string
    sender?: XOR<UserScalarRelationFilter, UserWhereInput>
    receiver?: XOR<UserScalarRelationFilter, UserWhereInput>
    conversation?: XOR<ConversationScalarRelationFilter, ConversationWhereInput>
    conversationAsLastMessage?: ConversationListRelationFilter
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    content?: SortOrder
    senderEmail?: SortOrder
    receiverEmail?: SortOrder
    conversationId?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sender?: UserOrderByWithRelationInput
    receiver?: UserOrderByWithRelationInput
    conversation?: ConversationOrderByWithRelationInput
    conversationAsLastMessage?: ConversationOrderByRelationAggregateInput
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    content?: StringFilter<"Message"> | string
    senderEmail?: StringFilter<"Message"> | string
    receiverEmail?: StringFilter<"Message"> | string
    conversationId?: StringFilter<"Message"> | string
    isRead?: BoolFilter<"Message"> | boolean
    createdAt?: DateTimeFilter<"Message"> | Date | string
    updatedAt?: DateTimeFilter<"Message"> | Date | string
    sender?: XOR<UserScalarRelationFilter, UserWhereInput>
    receiver?: XOR<UserScalarRelationFilter, UserWhereInput>
    conversation?: XOR<ConversationScalarRelationFilter, ConversationWhereInput>
    conversationAsLastMessage?: ConversationListRelationFilter
  }, "id">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    content?: SortOrder
    senderEmail?: SortOrder
    receiverEmail?: SortOrder
    conversationId?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MessageCountOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Message"> | string
    content?: StringWithAggregatesFilter<"Message"> | string
    senderEmail?: StringWithAggregatesFilter<"Message"> | string
    receiverEmail?: StringWithAggregatesFilter<"Message"> | string
    conversationId?: StringWithAggregatesFilter<"Message"> | string
    isRead?: BoolWithAggregatesFilter<"Message"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    type?: EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType
    isRead?: BoolFilter<"Notification"> | boolean
    userId?: StringFilter<"Notification"> | string
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    updatedAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    type?: EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType
    isRead?: BoolFilter<"Notification"> | boolean
    userId?: StringFilter<"Notification"> | string
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    updatedAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Notification"> | string
    title?: StringWithAggregatesFilter<"Notification"> | string
    message?: StringWithAggregatesFilter<"Notification"> | string
    type?: EnumNotificationTypeWithAggregatesFilter<"Notification"> | $Enums.NotificationType
    isRead?: BoolWithAggregatesFilter<"Notification"> | boolean
    userId?: StringWithAggregatesFilter<"Notification"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type SavedFreelancerWhereInput = {
    AND?: SavedFreelancerWhereInput | SavedFreelancerWhereInput[]
    OR?: SavedFreelancerWhereInput[]
    NOT?: SavedFreelancerWhereInput | SavedFreelancerWhereInput[]
    id?: StringFilter<"SavedFreelancer"> | string
    userId?: StringFilter<"SavedFreelancer"> | string
    freelancerId?: StringFilter<"SavedFreelancer"> | string
    createdAt?: DateTimeFilter<"SavedFreelancer"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    freelancer?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SavedFreelancerOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    freelancerId?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    freelancer?: UserOrderByWithRelationInput
  }

  export type SavedFreelancerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_freelancerId?: SavedFreelancerUserIdFreelancerIdCompoundUniqueInput
    AND?: SavedFreelancerWhereInput | SavedFreelancerWhereInput[]
    OR?: SavedFreelancerWhereInput[]
    NOT?: SavedFreelancerWhereInput | SavedFreelancerWhereInput[]
    userId?: StringFilter<"SavedFreelancer"> | string
    freelancerId?: StringFilter<"SavedFreelancer"> | string
    createdAt?: DateTimeFilter<"SavedFreelancer"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    freelancer?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_freelancerId">

  export type SavedFreelancerOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    freelancerId?: SortOrder
    createdAt?: SortOrder
    _count?: SavedFreelancerCountOrderByAggregateInput
    _max?: SavedFreelancerMaxOrderByAggregateInput
    _min?: SavedFreelancerMinOrderByAggregateInput
  }

  export type SavedFreelancerScalarWhereWithAggregatesInput = {
    AND?: SavedFreelancerScalarWhereWithAggregatesInput | SavedFreelancerScalarWhereWithAggregatesInput[]
    OR?: SavedFreelancerScalarWhereWithAggregatesInput[]
    NOT?: SavedFreelancerScalarWhereWithAggregatesInput | SavedFreelancerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SavedFreelancer"> | string
    userId?: StringWithAggregatesFilter<"SavedFreelancer"> | string
    freelancerId?: StringWithAggregatesFilter<"SavedFreelancer"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SavedFreelancer"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    googleId?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    avatar?: string | null
    bio?: string | null
    location?: string | null
    phone?: string | null
    userType?: $Enums.UserType
    isOnboarded?: boolean
    onboardingStep?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    country?: string | null
    city?: string | null
    timezone?: string | null
    title?: string | null
    overview?: string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserCreatetopSkillsInput | string[]
    serviceOfferings?: UserCreateserviceOfferingsInput | string[]
    hourlyRate?: number | null
    portfolio?: string | null
    experience?: string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserCreatecertificationsInput | string[]
    availability?: string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: string | null
    subcategory?: string | null
    experienceLevel?: string | null
    totalEarnings?: string | null
    successRate?: number | null
    completedJobs?: number | null
    onTime?: number | null
    onBudget?: number | null
    responseTime?: string | null
    lastActive?: string | null
    topRatedPlus?: boolean
    verified?: boolean
    risingTalent?: boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserCreatespecializationsInput | string[]
    memberSince?: string | null
    profileStrength?: number | null
    repeatHireRate?: number | null
    rating?: number | null
    reviewCount?: number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: string | null
    isOnline?: boolean
    hourlyRateRange?: string | null
    availabilityStatus?: string | null
    companyName?: string | null
    companySize?: string | null
    industry?: string | null
    companyWebsite?: string | null
    companyDescription?: string | null
    projectTypes?: UserCreateprojectTypesInput | string[]
    preferredSkills?: UserCreatepreferredSkillsInput | string[]
    budgetRange?: string | null
    clientType?: string | null
    howDidYouHear?: string | null
    interestedCategories?: UserCreateinterestedCategoriesInput | string[]
    urgencyLevel?: string | null
    preferredWorkingStyle?: string | null
    communicationPreference?: UserCreatecommunicationPreferenceInput | string[]
    projectDescription?: string | null
    paymentPreference?: string | null
    projectFrequency?: string | null
    averageProjectDuration?: string | null
    maxHourlyRate?: string | null
    totalMonthlyBudget?: string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserCreateworkingDaysInput | string[]
    minimumProjectBudget?: string | null
    specialRequirements?: string | null
    idDocument?: string | null
    addressProof?: string | null
    taxInformation?: string | null
    phoneVerified?: boolean
    jobsPosted?: JobCreateNestedManyWithoutClientInput
    proposals?: ProposalCreateNestedManyWithoutFreelancerInput
    reviews?: ReviewCreateNestedManyWithoutAuthorInput
    receivedReviews?: ReviewCreateNestedManyWithoutReceiverInput
    messages?: MessageCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    savedFreelancers?: SavedFreelancerCreateNestedManyWithoutUserInput
    savedByUsers?: SavedFreelancerCreateNestedManyWithoutFreelancerInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    googleId?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    avatar?: string | null
    bio?: string | null
    location?: string | null
    phone?: string | null
    userType?: $Enums.UserType
    isOnboarded?: boolean
    onboardingStep?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    country?: string | null
    city?: string | null
    timezone?: string | null
    title?: string | null
    overview?: string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserCreatetopSkillsInput | string[]
    serviceOfferings?: UserCreateserviceOfferingsInput | string[]
    hourlyRate?: number | null
    portfolio?: string | null
    experience?: string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserCreatecertificationsInput | string[]
    availability?: string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: string | null
    subcategory?: string | null
    experienceLevel?: string | null
    totalEarnings?: string | null
    successRate?: number | null
    completedJobs?: number | null
    onTime?: number | null
    onBudget?: number | null
    responseTime?: string | null
    lastActive?: string | null
    topRatedPlus?: boolean
    verified?: boolean
    risingTalent?: boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserCreatespecializationsInput | string[]
    memberSince?: string | null
    profileStrength?: number | null
    repeatHireRate?: number | null
    rating?: number | null
    reviewCount?: number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: string | null
    isOnline?: boolean
    hourlyRateRange?: string | null
    availabilityStatus?: string | null
    companyName?: string | null
    companySize?: string | null
    industry?: string | null
    companyWebsite?: string | null
    companyDescription?: string | null
    projectTypes?: UserCreateprojectTypesInput | string[]
    preferredSkills?: UserCreatepreferredSkillsInput | string[]
    budgetRange?: string | null
    clientType?: string | null
    howDidYouHear?: string | null
    interestedCategories?: UserCreateinterestedCategoriesInput | string[]
    urgencyLevel?: string | null
    preferredWorkingStyle?: string | null
    communicationPreference?: UserCreatecommunicationPreferenceInput | string[]
    projectDescription?: string | null
    paymentPreference?: string | null
    projectFrequency?: string | null
    averageProjectDuration?: string | null
    maxHourlyRate?: string | null
    totalMonthlyBudget?: string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserCreateworkingDaysInput | string[]
    minimumProjectBudget?: string | null
    specialRequirements?: string | null
    idDocument?: string | null
    addressProof?: string | null
    taxInformation?: string | null
    phoneVerified?: boolean
    jobsPosted?: JobUncheckedCreateNestedManyWithoutClientInput
    proposals?: ProposalUncheckedCreateNestedManyWithoutFreelancerInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutAuthorInput
    receivedReviews?: ReviewUncheckedCreateNestedManyWithoutReceiverInput
    messages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    savedFreelancers?: SavedFreelancerUncheckedCreateNestedManyWithoutUserInput
    savedByUsers?: SavedFreelancerUncheckedCreateNestedManyWithoutFreelancerInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isOnboarded?: BoolFieldUpdateOperationsInput | boolean
    onboardingStep?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    overview?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserUpdatetopSkillsInput | string[]
    serviceOfferings?: UserUpdateserviceOfferingsInput | string[]
    hourlyRate?: NullableFloatFieldUpdateOperationsInput | number | null
    portfolio?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserUpdatecertificationsInput | string[]
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalEarnings?: NullableStringFieldUpdateOperationsInput | string | null
    successRate?: NullableIntFieldUpdateOperationsInput | number | null
    completedJobs?: NullableIntFieldUpdateOperationsInput | number | null
    onTime?: NullableIntFieldUpdateOperationsInput | number | null
    onBudget?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableStringFieldUpdateOperationsInput | string | null
    lastActive?: NullableStringFieldUpdateOperationsInput | string | null
    topRatedPlus?: BoolFieldUpdateOperationsInput | boolean
    verified?: BoolFieldUpdateOperationsInput | boolean
    risingTalent?: BoolFieldUpdateOperationsInput | boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserUpdatespecializationsInput | string[]
    memberSince?: NullableStringFieldUpdateOperationsInput | string | null
    profileStrength?: NullableIntFieldUpdateOperationsInput | number | null
    repeatHireRate?: NullableIntFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    reviewCount?: NullableIntFieldUpdateOperationsInput | number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    hourlyRateRange?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityStatus?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    companyWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    companyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    projectTypes?: UserUpdateprojectTypesInput | string[]
    preferredSkills?: UserUpdatepreferredSkillsInput | string[]
    budgetRange?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: NullableStringFieldUpdateOperationsInput | string | null
    howDidYouHear?: NullableStringFieldUpdateOperationsInput | string | null
    interestedCategories?: UserUpdateinterestedCategoriesInput | string[]
    urgencyLevel?: NullableStringFieldUpdateOperationsInput | string | null
    preferredWorkingStyle?: NullableStringFieldUpdateOperationsInput | string | null
    communicationPreference?: UserUpdatecommunicationPreferenceInput | string[]
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null
    paymentPreference?: NullableStringFieldUpdateOperationsInput | string | null
    projectFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    averageProjectDuration?: NullableStringFieldUpdateOperationsInput | string | null
    maxHourlyRate?: NullableStringFieldUpdateOperationsInput | string | null
    totalMonthlyBudget?: NullableStringFieldUpdateOperationsInput | string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserUpdateworkingDaysInput | string[]
    minimumProjectBudget?: NullableStringFieldUpdateOperationsInput | string | null
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    idDocument?: NullableStringFieldUpdateOperationsInput | string | null
    addressProof?: NullableStringFieldUpdateOperationsInput | string | null
    taxInformation?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    jobsPosted?: JobUpdateManyWithoutClientNestedInput
    proposals?: ProposalUpdateManyWithoutFreelancerNestedInput
    reviews?: ReviewUpdateManyWithoutAuthorNestedInput
    receivedReviews?: ReviewUpdateManyWithoutReceiverNestedInput
    messages?: MessageUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    savedFreelancers?: SavedFreelancerUpdateManyWithoutUserNestedInput
    savedByUsers?: SavedFreelancerUpdateManyWithoutFreelancerNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isOnboarded?: BoolFieldUpdateOperationsInput | boolean
    onboardingStep?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    overview?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserUpdatetopSkillsInput | string[]
    serviceOfferings?: UserUpdateserviceOfferingsInput | string[]
    hourlyRate?: NullableFloatFieldUpdateOperationsInput | number | null
    portfolio?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserUpdatecertificationsInput | string[]
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalEarnings?: NullableStringFieldUpdateOperationsInput | string | null
    successRate?: NullableIntFieldUpdateOperationsInput | number | null
    completedJobs?: NullableIntFieldUpdateOperationsInput | number | null
    onTime?: NullableIntFieldUpdateOperationsInput | number | null
    onBudget?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableStringFieldUpdateOperationsInput | string | null
    lastActive?: NullableStringFieldUpdateOperationsInput | string | null
    topRatedPlus?: BoolFieldUpdateOperationsInput | boolean
    verified?: BoolFieldUpdateOperationsInput | boolean
    risingTalent?: BoolFieldUpdateOperationsInput | boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserUpdatespecializationsInput | string[]
    memberSince?: NullableStringFieldUpdateOperationsInput | string | null
    profileStrength?: NullableIntFieldUpdateOperationsInput | number | null
    repeatHireRate?: NullableIntFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    reviewCount?: NullableIntFieldUpdateOperationsInput | number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    hourlyRateRange?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityStatus?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    companyWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    companyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    projectTypes?: UserUpdateprojectTypesInput | string[]
    preferredSkills?: UserUpdatepreferredSkillsInput | string[]
    budgetRange?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: NullableStringFieldUpdateOperationsInput | string | null
    howDidYouHear?: NullableStringFieldUpdateOperationsInput | string | null
    interestedCategories?: UserUpdateinterestedCategoriesInput | string[]
    urgencyLevel?: NullableStringFieldUpdateOperationsInput | string | null
    preferredWorkingStyle?: NullableStringFieldUpdateOperationsInput | string | null
    communicationPreference?: UserUpdatecommunicationPreferenceInput | string[]
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null
    paymentPreference?: NullableStringFieldUpdateOperationsInput | string | null
    projectFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    averageProjectDuration?: NullableStringFieldUpdateOperationsInput | string | null
    maxHourlyRate?: NullableStringFieldUpdateOperationsInput | string | null
    totalMonthlyBudget?: NullableStringFieldUpdateOperationsInput | string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserUpdateworkingDaysInput | string[]
    minimumProjectBudget?: NullableStringFieldUpdateOperationsInput | string | null
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    idDocument?: NullableStringFieldUpdateOperationsInput | string | null
    addressProof?: NullableStringFieldUpdateOperationsInput | string | null
    taxInformation?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    jobsPosted?: JobUncheckedUpdateManyWithoutClientNestedInput
    proposals?: ProposalUncheckedUpdateManyWithoutFreelancerNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutAuthorNestedInput
    receivedReviews?: ReviewUncheckedUpdateManyWithoutReceiverNestedInput
    messages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    savedFreelancers?: SavedFreelancerUncheckedUpdateManyWithoutUserNestedInput
    savedByUsers?: SavedFreelancerUncheckedUpdateManyWithoutFreelancerNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    googleId?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    avatar?: string | null
    bio?: string | null
    location?: string | null
    phone?: string | null
    userType?: $Enums.UserType
    isOnboarded?: boolean
    onboardingStep?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    country?: string | null
    city?: string | null
    timezone?: string | null
    title?: string | null
    overview?: string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserCreatetopSkillsInput | string[]
    serviceOfferings?: UserCreateserviceOfferingsInput | string[]
    hourlyRate?: number | null
    portfolio?: string | null
    experience?: string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserCreatecertificationsInput | string[]
    availability?: string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: string | null
    subcategory?: string | null
    experienceLevel?: string | null
    totalEarnings?: string | null
    successRate?: number | null
    completedJobs?: number | null
    onTime?: number | null
    onBudget?: number | null
    responseTime?: string | null
    lastActive?: string | null
    topRatedPlus?: boolean
    verified?: boolean
    risingTalent?: boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserCreatespecializationsInput | string[]
    memberSince?: string | null
    profileStrength?: number | null
    repeatHireRate?: number | null
    rating?: number | null
    reviewCount?: number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: string | null
    isOnline?: boolean
    hourlyRateRange?: string | null
    availabilityStatus?: string | null
    companyName?: string | null
    companySize?: string | null
    industry?: string | null
    companyWebsite?: string | null
    companyDescription?: string | null
    projectTypes?: UserCreateprojectTypesInput | string[]
    preferredSkills?: UserCreatepreferredSkillsInput | string[]
    budgetRange?: string | null
    clientType?: string | null
    howDidYouHear?: string | null
    interestedCategories?: UserCreateinterestedCategoriesInput | string[]
    urgencyLevel?: string | null
    preferredWorkingStyle?: string | null
    communicationPreference?: UserCreatecommunicationPreferenceInput | string[]
    projectDescription?: string | null
    paymentPreference?: string | null
    projectFrequency?: string | null
    averageProjectDuration?: string | null
    maxHourlyRate?: string | null
    totalMonthlyBudget?: string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserCreateworkingDaysInput | string[]
    minimumProjectBudget?: string | null
    specialRequirements?: string | null
    idDocument?: string | null
    addressProof?: string | null
    taxInformation?: string | null
    phoneVerified?: boolean
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isOnboarded?: BoolFieldUpdateOperationsInput | boolean
    onboardingStep?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    overview?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserUpdatetopSkillsInput | string[]
    serviceOfferings?: UserUpdateserviceOfferingsInput | string[]
    hourlyRate?: NullableFloatFieldUpdateOperationsInput | number | null
    portfolio?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserUpdatecertificationsInput | string[]
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalEarnings?: NullableStringFieldUpdateOperationsInput | string | null
    successRate?: NullableIntFieldUpdateOperationsInput | number | null
    completedJobs?: NullableIntFieldUpdateOperationsInput | number | null
    onTime?: NullableIntFieldUpdateOperationsInput | number | null
    onBudget?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableStringFieldUpdateOperationsInput | string | null
    lastActive?: NullableStringFieldUpdateOperationsInput | string | null
    topRatedPlus?: BoolFieldUpdateOperationsInput | boolean
    verified?: BoolFieldUpdateOperationsInput | boolean
    risingTalent?: BoolFieldUpdateOperationsInput | boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserUpdatespecializationsInput | string[]
    memberSince?: NullableStringFieldUpdateOperationsInput | string | null
    profileStrength?: NullableIntFieldUpdateOperationsInput | number | null
    repeatHireRate?: NullableIntFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    reviewCount?: NullableIntFieldUpdateOperationsInput | number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    hourlyRateRange?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityStatus?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    companyWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    companyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    projectTypes?: UserUpdateprojectTypesInput | string[]
    preferredSkills?: UserUpdatepreferredSkillsInput | string[]
    budgetRange?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: NullableStringFieldUpdateOperationsInput | string | null
    howDidYouHear?: NullableStringFieldUpdateOperationsInput | string | null
    interestedCategories?: UserUpdateinterestedCategoriesInput | string[]
    urgencyLevel?: NullableStringFieldUpdateOperationsInput | string | null
    preferredWorkingStyle?: NullableStringFieldUpdateOperationsInput | string | null
    communicationPreference?: UserUpdatecommunicationPreferenceInput | string[]
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null
    paymentPreference?: NullableStringFieldUpdateOperationsInput | string | null
    projectFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    averageProjectDuration?: NullableStringFieldUpdateOperationsInput | string | null
    maxHourlyRate?: NullableStringFieldUpdateOperationsInput | string | null
    totalMonthlyBudget?: NullableStringFieldUpdateOperationsInput | string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserUpdateworkingDaysInput | string[]
    minimumProjectBudget?: NullableStringFieldUpdateOperationsInput | string | null
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    idDocument?: NullableStringFieldUpdateOperationsInput | string | null
    addressProof?: NullableStringFieldUpdateOperationsInput | string | null
    taxInformation?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isOnboarded?: BoolFieldUpdateOperationsInput | boolean
    onboardingStep?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    overview?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserUpdatetopSkillsInput | string[]
    serviceOfferings?: UserUpdateserviceOfferingsInput | string[]
    hourlyRate?: NullableFloatFieldUpdateOperationsInput | number | null
    portfolio?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserUpdatecertificationsInput | string[]
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalEarnings?: NullableStringFieldUpdateOperationsInput | string | null
    successRate?: NullableIntFieldUpdateOperationsInput | number | null
    completedJobs?: NullableIntFieldUpdateOperationsInput | number | null
    onTime?: NullableIntFieldUpdateOperationsInput | number | null
    onBudget?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableStringFieldUpdateOperationsInput | string | null
    lastActive?: NullableStringFieldUpdateOperationsInput | string | null
    topRatedPlus?: BoolFieldUpdateOperationsInput | boolean
    verified?: BoolFieldUpdateOperationsInput | boolean
    risingTalent?: BoolFieldUpdateOperationsInput | boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserUpdatespecializationsInput | string[]
    memberSince?: NullableStringFieldUpdateOperationsInput | string | null
    profileStrength?: NullableIntFieldUpdateOperationsInput | number | null
    repeatHireRate?: NullableIntFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    reviewCount?: NullableIntFieldUpdateOperationsInput | number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    hourlyRateRange?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityStatus?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    companyWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    companyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    projectTypes?: UserUpdateprojectTypesInput | string[]
    preferredSkills?: UserUpdatepreferredSkillsInput | string[]
    budgetRange?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: NullableStringFieldUpdateOperationsInput | string | null
    howDidYouHear?: NullableStringFieldUpdateOperationsInput | string | null
    interestedCategories?: UserUpdateinterestedCategoriesInput | string[]
    urgencyLevel?: NullableStringFieldUpdateOperationsInput | string | null
    preferredWorkingStyle?: NullableStringFieldUpdateOperationsInput | string | null
    communicationPreference?: UserUpdatecommunicationPreferenceInput | string[]
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null
    paymentPreference?: NullableStringFieldUpdateOperationsInput | string | null
    projectFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    averageProjectDuration?: NullableStringFieldUpdateOperationsInput | string | null
    maxHourlyRate?: NullableStringFieldUpdateOperationsInput | string | null
    totalMonthlyBudget?: NullableStringFieldUpdateOperationsInput | string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserUpdateworkingDaysInput | string[]
    minimumProjectBudget?: NullableStringFieldUpdateOperationsInput | string | null
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    idDocument?: NullableStringFieldUpdateOperationsInput | string | null
    addressProof?: NullableStringFieldUpdateOperationsInput | string | null
    taxInformation?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
  }

  export type JobCreateInput = {
    id?: string
    title: string
    description: string
    requirements?: JobCreaterequirementsInput | string[]
    budget: $Enums.BudgetType
    minBudget?: number | null
    maxBudget?: number | null
    hourlyRate?: number | null
    duration?: string | null
    skills?: JobCreateskillsInput | string[]
    category: string
    subcategory?: string | null
    projectType?: string | null
    experienceLevel?: string | null
    workingHours?: string | null
    timezone?: string | null
    communicationPreferences?: JobCreatecommunicationPreferencesInput | string[]
    location?: string | null
    isRemote?: boolean
    status?: $Enums.JobStatus
    isUrgent?: boolean
    visibility?: string
    applicationDeadline?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    conversation?: ConversationCreateNestedManyWithoutJobInput
    client: UserCreateNestedOneWithoutJobsPostedInput
    proposals?: ProposalCreateNestedManyWithoutJobInput
    reviews?: ReviewCreateNestedManyWithoutJobInput
  }

  export type JobUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    requirements?: JobCreaterequirementsInput | string[]
    budget: $Enums.BudgetType
    minBudget?: number | null
    maxBudget?: number | null
    hourlyRate?: number | null
    duration?: string | null
    skills?: JobCreateskillsInput | string[]
    category: string
    subcategory?: string | null
    projectType?: string | null
    experienceLevel?: string | null
    workingHours?: string | null
    timezone?: string | null
    communicationPreferences?: JobCreatecommunicationPreferencesInput | string[]
    location?: string | null
    isRemote?: boolean
    status?: $Enums.JobStatus
    isUrgent?: boolean
    visibility?: string
    applicationDeadline?: Date | string | null
    clientId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    conversation?: ConversationUncheckedCreateNestedManyWithoutJobInput
    proposals?: ProposalUncheckedCreateNestedManyWithoutJobInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutJobInput
  }

  export type JobUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    requirements?: JobUpdaterequirementsInput | string[]
    budget?: EnumBudgetTypeFieldUpdateOperationsInput | $Enums.BudgetType
    minBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    maxBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    hourlyRate?: NullableFloatFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: JobUpdateskillsInput | string[]
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    projectType?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    communicationPreferences?: JobUpdatecommunicationPreferencesInput | string[]
    location?: NullableStringFieldUpdateOperationsInput | string | null
    isRemote?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    isUrgent?: BoolFieldUpdateOperationsInput | boolean
    visibility?: StringFieldUpdateOperationsInput | string
    applicationDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation?: ConversationUpdateManyWithoutJobNestedInput
    client?: UserUpdateOneRequiredWithoutJobsPostedNestedInput
    proposals?: ProposalUpdateManyWithoutJobNestedInput
    reviews?: ReviewUpdateManyWithoutJobNestedInput
  }

  export type JobUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    requirements?: JobUpdaterequirementsInput | string[]
    budget?: EnumBudgetTypeFieldUpdateOperationsInput | $Enums.BudgetType
    minBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    maxBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    hourlyRate?: NullableFloatFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: JobUpdateskillsInput | string[]
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    projectType?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    communicationPreferences?: JobUpdatecommunicationPreferencesInput | string[]
    location?: NullableStringFieldUpdateOperationsInput | string | null
    isRemote?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    isUrgent?: BoolFieldUpdateOperationsInput | boolean
    visibility?: StringFieldUpdateOperationsInput | string
    applicationDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clientId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation?: ConversationUncheckedUpdateManyWithoutJobNestedInput
    proposals?: ProposalUncheckedUpdateManyWithoutJobNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutJobNestedInput
  }

  export type JobCreateManyInput = {
    id?: string
    title: string
    description: string
    requirements?: JobCreaterequirementsInput | string[]
    budget: $Enums.BudgetType
    minBudget?: number | null
    maxBudget?: number | null
    hourlyRate?: number | null
    duration?: string | null
    skills?: JobCreateskillsInput | string[]
    category: string
    subcategory?: string | null
    projectType?: string | null
    experienceLevel?: string | null
    workingHours?: string | null
    timezone?: string | null
    communicationPreferences?: JobCreatecommunicationPreferencesInput | string[]
    location?: string | null
    isRemote?: boolean
    status?: $Enums.JobStatus
    isUrgent?: boolean
    visibility?: string
    applicationDeadline?: Date | string | null
    clientId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    requirements?: JobUpdaterequirementsInput | string[]
    budget?: EnumBudgetTypeFieldUpdateOperationsInput | $Enums.BudgetType
    minBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    maxBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    hourlyRate?: NullableFloatFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: JobUpdateskillsInput | string[]
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    projectType?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    communicationPreferences?: JobUpdatecommunicationPreferencesInput | string[]
    location?: NullableStringFieldUpdateOperationsInput | string | null
    isRemote?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    isUrgent?: BoolFieldUpdateOperationsInput | boolean
    visibility?: StringFieldUpdateOperationsInput | string
    applicationDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    requirements?: JobUpdaterequirementsInput | string[]
    budget?: EnumBudgetTypeFieldUpdateOperationsInput | $Enums.BudgetType
    minBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    maxBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    hourlyRate?: NullableFloatFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: JobUpdateskillsInput | string[]
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    projectType?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    communicationPreferences?: JobUpdatecommunicationPreferencesInput | string[]
    location?: NullableStringFieldUpdateOperationsInput | string | null
    isRemote?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    isUrgent?: BoolFieldUpdateOperationsInput | boolean
    visibility?: StringFieldUpdateOperationsInput | string
    applicationDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clientId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProposalCreateInput = {
    id?: string
    coverLetter: string
    bidAmount: number
    estimatedDuration: string
    attachments?: ProposalCreateattachmentsInput | string[]
    status?: $Enums.ProposalStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    questionResponses?: NullableJsonNullValueInput | InputJsonValue
    milestones?: NullableJsonNullValueInput | InputJsonValue
    clientNotes?: string | null
    clientViewed?: boolean
    rating?: number | null
    interview?: NullableJsonNullValueInput | InputJsonValue
    originalBudget?: number | null
    isShortlisted?: boolean
    job: JobCreateNestedOneWithoutProposalsInput
    freelancer: UserCreateNestedOneWithoutProposalsInput
  }

  export type ProposalUncheckedCreateInput = {
    id?: string
    coverLetter: string
    bidAmount: number
    estimatedDuration: string
    attachments?: ProposalCreateattachmentsInput | string[]
    status?: $Enums.ProposalStatus
    jobId: string
    freelancerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    questionResponses?: NullableJsonNullValueInput | InputJsonValue
    milestones?: NullableJsonNullValueInput | InputJsonValue
    clientNotes?: string | null
    clientViewed?: boolean
    rating?: number | null
    interview?: NullableJsonNullValueInput | InputJsonValue
    originalBudget?: number | null
    isShortlisted?: boolean
  }

  export type ProposalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    coverLetter?: StringFieldUpdateOperationsInput | string
    bidAmount?: FloatFieldUpdateOperationsInput | number
    estimatedDuration?: StringFieldUpdateOperationsInput | string
    attachments?: ProposalUpdateattachmentsInput | string[]
    status?: EnumProposalStatusFieldUpdateOperationsInput | $Enums.ProposalStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questionResponses?: NullableJsonNullValueInput | InputJsonValue
    milestones?: NullableJsonNullValueInput | InputJsonValue
    clientNotes?: NullableStringFieldUpdateOperationsInput | string | null
    clientViewed?: BoolFieldUpdateOperationsInput | boolean
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    interview?: NullableJsonNullValueInput | InputJsonValue
    originalBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    isShortlisted?: BoolFieldUpdateOperationsInput | boolean
    job?: JobUpdateOneRequiredWithoutProposalsNestedInput
    freelancer?: UserUpdateOneRequiredWithoutProposalsNestedInput
  }

  export type ProposalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    coverLetter?: StringFieldUpdateOperationsInput | string
    bidAmount?: FloatFieldUpdateOperationsInput | number
    estimatedDuration?: StringFieldUpdateOperationsInput | string
    attachments?: ProposalUpdateattachmentsInput | string[]
    status?: EnumProposalStatusFieldUpdateOperationsInput | $Enums.ProposalStatus
    jobId?: StringFieldUpdateOperationsInput | string
    freelancerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questionResponses?: NullableJsonNullValueInput | InputJsonValue
    milestones?: NullableJsonNullValueInput | InputJsonValue
    clientNotes?: NullableStringFieldUpdateOperationsInput | string | null
    clientViewed?: BoolFieldUpdateOperationsInput | boolean
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    interview?: NullableJsonNullValueInput | InputJsonValue
    originalBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    isShortlisted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProposalCreateManyInput = {
    id?: string
    coverLetter: string
    bidAmount: number
    estimatedDuration: string
    attachments?: ProposalCreateattachmentsInput | string[]
    status?: $Enums.ProposalStatus
    jobId: string
    freelancerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    questionResponses?: NullableJsonNullValueInput | InputJsonValue
    milestones?: NullableJsonNullValueInput | InputJsonValue
    clientNotes?: string | null
    clientViewed?: boolean
    rating?: number | null
    interview?: NullableJsonNullValueInput | InputJsonValue
    originalBudget?: number | null
    isShortlisted?: boolean
  }

  export type ProposalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    coverLetter?: StringFieldUpdateOperationsInput | string
    bidAmount?: FloatFieldUpdateOperationsInput | number
    estimatedDuration?: StringFieldUpdateOperationsInput | string
    attachments?: ProposalUpdateattachmentsInput | string[]
    status?: EnumProposalStatusFieldUpdateOperationsInput | $Enums.ProposalStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questionResponses?: NullableJsonNullValueInput | InputJsonValue
    milestones?: NullableJsonNullValueInput | InputJsonValue
    clientNotes?: NullableStringFieldUpdateOperationsInput | string | null
    clientViewed?: BoolFieldUpdateOperationsInput | boolean
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    interview?: NullableJsonNullValueInput | InputJsonValue
    originalBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    isShortlisted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProposalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    coverLetter?: StringFieldUpdateOperationsInput | string
    bidAmount?: FloatFieldUpdateOperationsInput | number
    estimatedDuration?: StringFieldUpdateOperationsInput | string
    attachments?: ProposalUpdateattachmentsInput | string[]
    status?: EnumProposalStatusFieldUpdateOperationsInput | $Enums.ProposalStatus
    jobId?: StringFieldUpdateOperationsInput | string
    freelancerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questionResponses?: NullableJsonNullValueInput | InputJsonValue
    milestones?: NullableJsonNullValueInput | InputJsonValue
    clientNotes?: NullableStringFieldUpdateOperationsInput | string | null
    clientViewed?: BoolFieldUpdateOperationsInput | boolean
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    interview?: NullableJsonNullValueInput | InputJsonValue
    originalBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    isShortlisted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ReviewCreateInput = {
    id?: string
    rating: number
    comment: string
    createdAt?: Date | string
    updatedAt?: Date | string
    author: UserCreateNestedOneWithoutReviewsInput
    receiver: UserCreateNestedOneWithoutReceivedReviewsInput
    job?: JobCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateInput = {
    id?: string
    rating: number
    comment: string
    authorId: string
    receiverId: string
    jobId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutReviewsNestedInput
    receiver?: UserUpdateOneRequiredWithoutReceivedReviewsNestedInput
    job?: JobUpdateOneWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    jobId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewCreateManyInput = {
    id?: string
    rating: number
    comment: string
    authorId: string
    receiverId: string
    jobId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    jobId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationCreateInput = {
    id?: string
    participants?: ConversationCreateparticipantsInput | string[]
    projectName?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    job?: JobCreateNestedOneWithoutConversationInput
    messages?: MessageCreateNestedManyWithoutConversationInput
    lastMessage?: MessageCreateNestedOneWithoutConversationAsLastMessageInput
  }

  export type ConversationUncheckedCreateInput = {
    id?: string
    participants?: ConversationCreateparticipantsInput | string[]
    jobId?: string | null
    projectName?: string | null
    isActive?: boolean
    lastMessageId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    participants?: ConversationUpdateparticipantsInput | string[]
    projectName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    job?: JobUpdateOneWithoutConversationNestedInput
    messages?: MessageUpdateManyWithoutConversationNestedInput
    lastMessage?: MessageUpdateOneWithoutConversationAsLastMessageNestedInput
  }

  export type ConversationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    participants?: ConversationUpdateparticipantsInput | string[]
    jobId?: NullableStringFieldUpdateOperationsInput | string | null
    projectName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type ConversationCreateManyInput = {
    id?: string
    participants?: ConversationCreateparticipantsInput | string[]
    jobId?: string | null
    projectName?: string | null
    isActive?: boolean
    lastMessageId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConversationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    participants?: ConversationUpdateparticipantsInput | string[]
    projectName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    participants?: ConversationUpdateparticipantsInput | string[]
    jobId?: NullableStringFieldUpdateOperationsInput | string | null
    projectName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateInput = {
    id?: string
    content: string
    isRead?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sender: UserCreateNestedOneWithoutMessagesInput
    receiver: UserCreateNestedOneWithoutReceivedMessagesInput
    conversation: ConversationCreateNestedOneWithoutMessagesInput
    conversationAsLastMessage?: ConversationCreateNestedManyWithoutLastMessageInput
  }

  export type MessageUncheckedCreateInput = {
    id?: string
    content: string
    senderEmail: string
    receiverEmail: string
    conversationId: string
    isRead?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    conversationAsLastMessage?: ConversationUncheckedCreateNestedManyWithoutLastMessageInput
  }

  export type MessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: UserUpdateOneRequiredWithoutMessagesNestedInput
    receiver?: UserUpdateOneRequiredWithoutReceivedMessagesNestedInput
    conversation?: ConversationUpdateOneRequiredWithoutMessagesNestedInput
    conversationAsLastMessage?: ConversationUpdateManyWithoutLastMessageNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    senderEmail?: StringFieldUpdateOperationsInput | string
    receiverEmail?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversationAsLastMessage?: ConversationUncheckedUpdateManyWithoutLastMessageNestedInput
  }

  export type MessageCreateManyInput = {
    id?: string
    content: string
    senderEmail: string
    receiverEmail: string
    conversationId: string
    isRead?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    senderEmail?: StringFieldUpdateOperationsInput | string
    receiverEmail?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    id?: string
    title: string
    message: string
    type: $Enums.NotificationType
    isRead?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateInput = {
    id?: string
    title: string
    message: string
    type: $Enums.NotificationType
    isRead?: boolean
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    isRead?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: string
    title: string
    message: string
    type: $Enums.NotificationType
    isRead?: boolean
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    isRead?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedFreelancerCreateInput = {
    id?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSavedFreelancersInput
    freelancer: UserCreateNestedOneWithoutSavedByUsersInput
  }

  export type SavedFreelancerUncheckedCreateInput = {
    id?: string
    userId: string
    freelancerId: string
    createdAt?: Date | string
  }

  export type SavedFreelancerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSavedFreelancersNestedInput
    freelancer?: UserUpdateOneRequiredWithoutSavedByUsersNestedInput
  }

  export type SavedFreelancerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    freelancerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedFreelancerCreateManyInput = {
    id?: string
    userId: string
    freelancerId: string
    createdAt?: Date | string
  }

  export type SavedFreelancerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedFreelancerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    freelancerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumUserTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUserTypeFilter<$PrismaModel> | $Enums.UserType
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type JobListRelationFilter = {
    every?: JobWhereInput
    some?: JobWhereInput
    none?: JobWhereInput
  }

  export type ProposalListRelationFilter = {
    every?: ProposalWhereInput
    some?: ProposalWhereInput
    none?: ProposalWhereInput
  }

  export type ReviewListRelationFilter = {
    every?: ReviewWhereInput
    some?: ReviewWhereInput
    none?: ReviewWhereInput
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type SavedFreelancerListRelationFilter = {
    every?: SavedFreelancerWhereInput
    some?: SavedFreelancerWhereInput
    none?: SavedFreelancerWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type JobOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProposalOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SavedFreelancerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    googleId?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    avatar?: SortOrder
    bio?: SortOrder
    location?: SortOrder
    phone?: SortOrder
    userType?: SortOrder
    isOnboarded?: SortOrder
    onboardingStep?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    country?: SortOrder
    city?: SortOrder
    timezone?: SortOrder
    title?: SortOrder
    overview?: SortOrder
    skills?: SortOrder
    topSkills?: SortOrder
    serviceOfferings?: SortOrder
    hourlyRate?: SortOrder
    portfolio?: SortOrder
    experience?: SortOrder
    education?: SortOrder
    workExperience?: SortOrder
    certifications?: SortOrder
    availability?: SortOrder
    languages?: SortOrder
    socialLinks?: SortOrder
    category?: SortOrder
    subcategory?: SortOrder
    experienceLevel?: SortOrder
    totalEarnings?: SortOrder
    successRate?: SortOrder
    completedJobs?: SortOrder
    onTime?: SortOrder
    onBudget?: SortOrder
    responseTime?: SortOrder
    lastActive?: SortOrder
    topRatedPlus?: SortOrder
    verified?: SortOrder
    risingTalent?: SortOrder
    portfolioItems?: SortOrder
    testScores?: SortOrder
    specializations?: SortOrder
    memberSince?: SortOrder
    profileStrength?: SortOrder
    repeatHireRate?: SortOrder
    rating?: SortOrder
    reviewCount?: SortOrder
    portfolioProjects?: SortOrder
    workHistory?: SortOrder
    employmentHistory?: SortOrder
    coverImage?: SortOrder
    isOnline?: SortOrder
    hourlyRateRange?: SortOrder
    availabilityStatus?: SortOrder
    companyName?: SortOrder
    companySize?: SortOrder
    industry?: SortOrder
    companyWebsite?: SortOrder
    companyDescription?: SortOrder
    projectTypes?: SortOrder
    preferredSkills?: SortOrder
    budgetRange?: SortOrder
    clientType?: SortOrder
    howDidYouHear?: SortOrder
    interestedCategories?: SortOrder
    urgencyLevel?: SortOrder
    preferredWorkingStyle?: SortOrder
    communicationPreference?: SortOrder
    projectDescription?: SortOrder
    paymentPreference?: SortOrder
    projectFrequency?: SortOrder
    averageProjectDuration?: SortOrder
    maxHourlyRate?: SortOrder
    totalMonthlyBudget?: SortOrder
    projectBasedRates?: SortOrder
    hoursPerWeek?: SortOrder
    workingHours?: SortOrder
    workingDays?: SortOrder
    minimumProjectBudget?: SortOrder
    specialRequirements?: SortOrder
    idDocument?: SortOrder
    addressProof?: SortOrder
    taxInformation?: SortOrder
    phoneVerified?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    onboardingStep?: SortOrder
    hourlyRate?: SortOrder
    successRate?: SortOrder
    completedJobs?: SortOrder
    onTime?: SortOrder
    onBudget?: SortOrder
    profileStrength?: SortOrder
    repeatHireRate?: SortOrder
    rating?: SortOrder
    reviewCount?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    googleId?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    avatar?: SortOrder
    bio?: SortOrder
    location?: SortOrder
    phone?: SortOrder
    userType?: SortOrder
    isOnboarded?: SortOrder
    onboardingStep?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    country?: SortOrder
    city?: SortOrder
    timezone?: SortOrder
    title?: SortOrder
    overview?: SortOrder
    hourlyRate?: SortOrder
    portfolio?: SortOrder
    experience?: SortOrder
    availability?: SortOrder
    category?: SortOrder
    subcategory?: SortOrder
    experienceLevel?: SortOrder
    totalEarnings?: SortOrder
    successRate?: SortOrder
    completedJobs?: SortOrder
    onTime?: SortOrder
    onBudget?: SortOrder
    responseTime?: SortOrder
    lastActive?: SortOrder
    topRatedPlus?: SortOrder
    verified?: SortOrder
    risingTalent?: SortOrder
    memberSince?: SortOrder
    profileStrength?: SortOrder
    repeatHireRate?: SortOrder
    rating?: SortOrder
    reviewCount?: SortOrder
    coverImage?: SortOrder
    isOnline?: SortOrder
    hourlyRateRange?: SortOrder
    availabilityStatus?: SortOrder
    companyName?: SortOrder
    companySize?: SortOrder
    industry?: SortOrder
    companyWebsite?: SortOrder
    companyDescription?: SortOrder
    budgetRange?: SortOrder
    clientType?: SortOrder
    howDidYouHear?: SortOrder
    urgencyLevel?: SortOrder
    preferredWorkingStyle?: SortOrder
    projectDescription?: SortOrder
    paymentPreference?: SortOrder
    projectFrequency?: SortOrder
    averageProjectDuration?: SortOrder
    maxHourlyRate?: SortOrder
    totalMonthlyBudget?: SortOrder
    hoursPerWeek?: SortOrder
    minimumProjectBudget?: SortOrder
    specialRequirements?: SortOrder
    idDocument?: SortOrder
    addressProof?: SortOrder
    taxInformation?: SortOrder
    phoneVerified?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    googleId?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    avatar?: SortOrder
    bio?: SortOrder
    location?: SortOrder
    phone?: SortOrder
    userType?: SortOrder
    isOnboarded?: SortOrder
    onboardingStep?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    country?: SortOrder
    city?: SortOrder
    timezone?: SortOrder
    title?: SortOrder
    overview?: SortOrder
    hourlyRate?: SortOrder
    portfolio?: SortOrder
    experience?: SortOrder
    availability?: SortOrder
    category?: SortOrder
    subcategory?: SortOrder
    experienceLevel?: SortOrder
    totalEarnings?: SortOrder
    successRate?: SortOrder
    completedJobs?: SortOrder
    onTime?: SortOrder
    onBudget?: SortOrder
    responseTime?: SortOrder
    lastActive?: SortOrder
    topRatedPlus?: SortOrder
    verified?: SortOrder
    risingTalent?: SortOrder
    memberSince?: SortOrder
    profileStrength?: SortOrder
    repeatHireRate?: SortOrder
    rating?: SortOrder
    reviewCount?: SortOrder
    coverImage?: SortOrder
    isOnline?: SortOrder
    hourlyRateRange?: SortOrder
    availabilityStatus?: SortOrder
    companyName?: SortOrder
    companySize?: SortOrder
    industry?: SortOrder
    companyWebsite?: SortOrder
    companyDescription?: SortOrder
    budgetRange?: SortOrder
    clientType?: SortOrder
    howDidYouHear?: SortOrder
    urgencyLevel?: SortOrder
    preferredWorkingStyle?: SortOrder
    projectDescription?: SortOrder
    paymentPreference?: SortOrder
    projectFrequency?: SortOrder
    averageProjectDuration?: SortOrder
    maxHourlyRate?: SortOrder
    totalMonthlyBudget?: SortOrder
    hoursPerWeek?: SortOrder
    minimumProjectBudget?: SortOrder
    specialRequirements?: SortOrder
    idDocument?: SortOrder
    addressProof?: SortOrder
    taxInformation?: SortOrder
    phoneVerified?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    onboardingStep?: SortOrder
    hourlyRate?: SortOrder
    successRate?: SortOrder
    completedJobs?: SortOrder
    onTime?: SortOrder
    onBudget?: SortOrder
    profileStrength?: SortOrder
    repeatHireRate?: SortOrder
    rating?: SortOrder
    reviewCount?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumUserTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUserTypeWithAggregatesFilter<$PrismaModel> | $Enums.UserType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserTypeFilter<$PrismaModel>
    _max?: NestedEnumUserTypeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumBudgetTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.BudgetType | EnumBudgetTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BudgetType[] | ListEnumBudgetTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BudgetType[] | ListEnumBudgetTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBudgetTypeFilter<$PrismaModel> | $Enums.BudgetType
  }

  export type EnumJobStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusFilter<$PrismaModel> | $Enums.JobStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ConversationListRelationFilter = {
    every?: ConversationWhereInput
    some?: ConversationWhereInput
    none?: ConversationWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ConversationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type JobCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    requirements?: SortOrder
    budget?: SortOrder
    minBudget?: SortOrder
    maxBudget?: SortOrder
    hourlyRate?: SortOrder
    duration?: SortOrder
    skills?: SortOrder
    category?: SortOrder
    subcategory?: SortOrder
    projectType?: SortOrder
    experienceLevel?: SortOrder
    workingHours?: SortOrder
    timezone?: SortOrder
    communicationPreferences?: SortOrder
    location?: SortOrder
    isRemote?: SortOrder
    status?: SortOrder
    isUrgent?: SortOrder
    visibility?: SortOrder
    applicationDeadline?: SortOrder
    clientId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobAvgOrderByAggregateInput = {
    minBudget?: SortOrder
    maxBudget?: SortOrder
    hourlyRate?: SortOrder
  }

  export type JobMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    budget?: SortOrder
    minBudget?: SortOrder
    maxBudget?: SortOrder
    hourlyRate?: SortOrder
    duration?: SortOrder
    category?: SortOrder
    subcategory?: SortOrder
    projectType?: SortOrder
    experienceLevel?: SortOrder
    workingHours?: SortOrder
    timezone?: SortOrder
    location?: SortOrder
    isRemote?: SortOrder
    status?: SortOrder
    isUrgent?: SortOrder
    visibility?: SortOrder
    applicationDeadline?: SortOrder
    clientId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    budget?: SortOrder
    minBudget?: SortOrder
    maxBudget?: SortOrder
    hourlyRate?: SortOrder
    duration?: SortOrder
    category?: SortOrder
    subcategory?: SortOrder
    projectType?: SortOrder
    experienceLevel?: SortOrder
    workingHours?: SortOrder
    timezone?: SortOrder
    location?: SortOrder
    isRemote?: SortOrder
    status?: SortOrder
    isUrgent?: SortOrder
    visibility?: SortOrder
    applicationDeadline?: SortOrder
    clientId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobSumOrderByAggregateInput = {
    minBudget?: SortOrder
    maxBudget?: SortOrder
    hourlyRate?: SortOrder
  }

  export type EnumBudgetTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BudgetType | EnumBudgetTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BudgetType[] | ListEnumBudgetTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BudgetType[] | ListEnumBudgetTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBudgetTypeWithAggregatesFilter<$PrismaModel> | $Enums.BudgetType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBudgetTypeFilter<$PrismaModel>
    _max?: NestedEnumBudgetTypeFilter<$PrismaModel>
  }

  export type EnumJobStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusWithAggregatesFilter<$PrismaModel> | $Enums.JobStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJobStatusFilter<$PrismaModel>
    _max?: NestedEnumJobStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type EnumProposalStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProposalStatus | EnumProposalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProposalStatus[] | ListEnumProposalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProposalStatus[] | ListEnumProposalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProposalStatusFilter<$PrismaModel> | $Enums.ProposalStatus
  }

  export type JobScalarRelationFilter = {
    is?: JobWhereInput
    isNot?: JobWhereInput
  }

  export type ProposalCountOrderByAggregateInput = {
    id?: SortOrder
    coverLetter?: SortOrder
    bidAmount?: SortOrder
    estimatedDuration?: SortOrder
    attachments?: SortOrder
    status?: SortOrder
    jobId?: SortOrder
    freelancerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    questionResponses?: SortOrder
    milestones?: SortOrder
    clientNotes?: SortOrder
    clientViewed?: SortOrder
    rating?: SortOrder
    interview?: SortOrder
    originalBudget?: SortOrder
    isShortlisted?: SortOrder
  }

  export type ProposalAvgOrderByAggregateInput = {
    bidAmount?: SortOrder
    rating?: SortOrder
    originalBudget?: SortOrder
  }

  export type ProposalMaxOrderByAggregateInput = {
    id?: SortOrder
    coverLetter?: SortOrder
    bidAmount?: SortOrder
    estimatedDuration?: SortOrder
    status?: SortOrder
    jobId?: SortOrder
    freelancerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clientNotes?: SortOrder
    clientViewed?: SortOrder
    rating?: SortOrder
    originalBudget?: SortOrder
    isShortlisted?: SortOrder
  }

  export type ProposalMinOrderByAggregateInput = {
    id?: SortOrder
    coverLetter?: SortOrder
    bidAmount?: SortOrder
    estimatedDuration?: SortOrder
    status?: SortOrder
    jobId?: SortOrder
    freelancerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clientNotes?: SortOrder
    clientViewed?: SortOrder
    rating?: SortOrder
    originalBudget?: SortOrder
    isShortlisted?: SortOrder
  }

  export type ProposalSumOrderByAggregateInput = {
    bidAmount?: SortOrder
    rating?: SortOrder
    originalBudget?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumProposalStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProposalStatus | EnumProposalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProposalStatus[] | ListEnumProposalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProposalStatus[] | ListEnumProposalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProposalStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProposalStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProposalStatusFilter<$PrismaModel>
    _max?: NestedEnumProposalStatusFilter<$PrismaModel>
  }

  export type JobNullableScalarRelationFilter = {
    is?: JobWhereInput | null
    isNot?: JobWhereInput | null
  }

  export type ReviewCountOrderByAggregateInput = {
    id?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    authorId?: SortOrder
    receiverId?: SortOrder
    jobId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReviewAvgOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type ReviewMaxOrderByAggregateInput = {
    id?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    authorId?: SortOrder
    receiverId?: SortOrder
    jobId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReviewMinOrderByAggregateInput = {
    id?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    authorId?: SortOrder
    receiverId?: SortOrder
    jobId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReviewSumOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type MessageNullableScalarRelationFilter = {
    is?: MessageWhereInput | null
    isNot?: MessageWhereInput | null
  }

  export type ConversationCountOrderByAggregateInput = {
    id?: SortOrder
    participants?: SortOrder
    jobId?: SortOrder
    projectName?: SortOrder
    isActive?: SortOrder
    lastMessageId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConversationMaxOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    projectName?: SortOrder
    isActive?: SortOrder
    lastMessageId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConversationMinOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    projectName?: SortOrder
    isActive?: SortOrder
    lastMessageId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConversationScalarRelationFilter = {
    is?: ConversationWhereInput
    isNot?: ConversationWhereInput
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    senderEmail?: SortOrder
    receiverEmail?: SortOrder
    conversationId?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    senderEmail?: SortOrder
    receiverEmail?: SortOrder
    conversationId?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    senderEmail?: SortOrder
    receiverEmail?: SortOrder
    conversationId?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationTypeFilter<$PrismaModel>
    _max?: NestedEnumNotificationTypeFilter<$PrismaModel>
  }

  export type SavedFreelancerUserIdFreelancerIdCompoundUniqueInput = {
    userId: string
    freelancerId: string
  }

  export type SavedFreelancerCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    freelancerId?: SortOrder
    createdAt?: SortOrder
  }

  export type SavedFreelancerMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    freelancerId?: SortOrder
    createdAt?: SortOrder
  }

  export type SavedFreelancerMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    freelancerId?: SortOrder
    createdAt?: SortOrder
  }

  export type UserCreatetopSkillsInput = {
    set: string[]
  }

  export type UserCreateserviceOfferingsInput = {
    set: string[]
  }

  export type UserCreatecertificationsInput = {
    set: string[]
  }

  export type UserCreatespecializationsInput = {
    set: string[]
  }

  export type UserCreateprojectTypesInput = {
    set: string[]
  }

  export type UserCreatepreferredSkillsInput = {
    set: string[]
  }

  export type UserCreateinterestedCategoriesInput = {
    set: string[]
  }

  export type UserCreatecommunicationPreferenceInput = {
    set: string[]
  }

  export type UserCreateworkingDaysInput = {
    set: string[]
  }

  export type JobCreateNestedManyWithoutClientInput = {
    create?: XOR<JobCreateWithoutClientInput, JobUncheckedCreateWithoutClientInput> | JobCreateWithoutClientInput[] | JobUncheckedCreateWithoutClientInput[]
    connectOrCreate?: JobCreateOrConnectWithoutClientInput | JobCreateOrConnectWithoutClientInput[]
    createMany?: JobCreateManyClientInputEnvelope
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
  }

  export type ProposalCreateNestedManyWithoutFreelancerInput = {
    create?: XOR<ProposalCreateWithoutFreelancerInput, ProposalUncheckedCreateWithoutFreelancerInput> | ProposalCreateWithoutFreelancerInput[] | ProposalUncheckedCreateWithoutFreelancerInput[]
    connectOrCreate?: ProposalCreateOrConnectWithoutFreelancerInput | ProposalCreateOrConnectWithoutFreelancerInput[]
    createMany?: ProposalCreateManyFreelancerInputEnvelope
    connect?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[]
  }

  export type ReviewCreateNestedManyWithoutAuthorInput = {
    create?: XOR<ReviewCreateWithoutAuthorInput, ReviewUncheckedCreateWithoutAuthorInput> | ReviewCreateWithoutAuthorInput[] | ReviewUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutAuthorInput | ReviewCreateOrConnectWithoutAuthorInput[]
    createMany?: ReviewCreateManyAuthorInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type ReviewCreateNestedManyWithoutReceiverInput = {
    create?: XOR<ReviewCreateWithoutReceiverInput, ReviewUncheckedCreateWithoutReceiverInput> | ReviewCreateWithoutReceiverInput[] | ReviewUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutReceiverInput | ReviewCreateOrConnectWithoutReceiverInput[]
    createMany?: ReviewCreateManyReceiverInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type MessageCreateNestedManyWithoutSenderInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type MessageCreateNestedManyWithoutReceiverInput = {
    create?: XOR<MessageCreateWithoutReceiverInput, MessageUncheckedCreateWithoutReceiverInput> | MessageCreateWithoutReceiverInput[] | MessageUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutReceiverInput | MessageCreateOrConnectWithoutReceiverInput[]
    createMany?: MessageCreateManyReceiverInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type SavedFreelancerCreateNestedManyWithoutUserInput = {
    create?: XOR<SavedFreelancerCreateWithoutUserInput, SavedFreelancerUncheckedCreateWithoutUserInput> | SavedFreelancerCreateWithoutUserInput[] | SavedFreelancerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SavedFreelancerCreateOrConnectWithoutUserInput | SavedFreelancerCreateOrConnectWithoutUserInput[]
    createMany?: SavedFreelancerCreateManyUserInputEnvelope
    connect?: SavedFreelancerWhereUniqueInput | SavedFreelancerWhereUniqueInput[]
  }

  export type SavedFreelancerCreateNestedManyWithoutFreelancerInput = {
    create?: XOR<SavedFreelancerCreateWithoutFreelancerInput, SavedFreelancerUncheckedCreateWithoutFreelancerInput> | SavedFreelancerCreateWithoutFreelancerInput[] | SavedFreelancerUncheckedCreateWithoutFreelancerInput[]
    connectOrCreate?: SavedFreelancerCreateOrConnectWithoutFreelancerInput | SavedFreelancerCreateOrConnectWithoutFreelancerInput[]
    createMany?: SavedFreelancerCreateManyFreelancerInputEnvelope
    connect?: SavedFreelancerWhereUniqueInput | SavedFreelancerWhereUniqueInput[]
  }

  export type JobUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<JobCreateWithoutClientInput, JobUncheckedCreateWithoutClientInput> | JobCreateWithoutClientInput[] | JobUncheckedCreateWithoutClientInput[]
    connectOrCreate?: JobCreateOrConnectWithoutClientInput | JobCreateOrConnectWithoutClientInput[]
    createMany?: JobCreateManyClientInputEnvelope
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
  }

  export type ProposalUncheckedCreateNestedManyWithoutFreelancerInput = {
    create?: XOR<ProposalCreateWithoutFreelancerInput, ProposalUncheckedCreateWithoutFreelancerInput> | ProposalCreateWithoutFreelancerInput[] | ProposalUncheckedCreateWithoutFreelancerInput[]
    connectOrCreate?: ProposalCreateOrConnectWithoutFreelancerInput | ProposalCreateOrConnectWithoutFreelancerInput[]
    createMany?: ProposalCreateManyFreelancerInputEnvelope
    connect?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<ReviewCreateWithoutAuthorInput, ReviewUncheckedCreateWithoutAuthorInput> | ReviewCreateWithoutAuthorInput[] | ReviewUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutAuthorInput | ReviewCreateOrConnectWithoutAuthorInput[]
    createMany?: ReviewCreateManyAuthorInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutReceiverInput = {
    create?: XOR<ReviewCreateWithoutReceiverInput, ReviewUncheckedCreateWithoutReceiverInput> | ReviewCreateWithoutReceiverInput[] | ReviewUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutReceiverInput | ReviewCreateOrConnectWithoutReceiverInput[]
    createMany?: ReviewCreateManyReceiverInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutSenderInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutReceiverInput = {
    create?: XOR<MessageCreateWithoutReceiverInput, MessageUncheckedCreateWithoutReceiverInput> | MessageCreateWithoutReceiverInput[] | MessageUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutReceiverInput | MessageCreateOrConnectWithoutReceiverInput[]
    createMany?: MessageCreateManyReceiverInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type SavedFreelancerUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SavedFreelancerCreateWithoutUserInput, SavedFreelancerUncheckedCreateWithoutUserInput> | SavedFreelancerCreateWithoutUserInput[] | SavedFreelancerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SavedFreelancerCreateOrConnectWithoutUserInput | SavedFreelancerCreateOrConnectWithoutUserInput[]
    createMany?: SavedFreelancerCreateManyUserInputEnvelope
    connect?: SavedFreelancerWhereUniqueInput | SavedFreelancerWhereUniqueInput[]
  }

  export type SavedFreelancerUncheckedCreateNestedManyWithoutFreelancerInput = {
    create?: XOR<SavedFreelancerCreateWithoutFreelancerInput, SavedFreelancerUncheckedCreateWithoutFreelancerInput> | SavedFreelancerCreateWithoutFreelancerInput[] | SavedFreelancerUncheckedCreateWithoutFreelancerInput[]
    connectOrCreate?: SavedFreelancerCreateOrConnectWithoutFreelancerInput | SavedFreelancerCreateOrConnectWithoutFreelancerInput[]
    createMany?: SavedFreelancerCreateManyFreelancerInputEnvelope
    connect?: SavedFreelancerWhereUniqueInput | SavedFreelancerWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumUserTypeFieldUpdateOperationsInput = {
    set?: $Enums.UserType
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdatetopSkillsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateserviceOfferingsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdatecertificationsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdatespecializationsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateprojectTypesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdatepreferredSkillsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateinterestedCategoriesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdatecommunicationPreferenceInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateworkingDaysInput = {
    set?: string[]
    push?: string | string[]
  }

  export type JobUpdateManyWithoutClientNestedInput = {
    create?: XOR<JobCreateWithoutClientInput, JobUncheckedCreateWithoutClientInput> | JobCreateWithoutClientInput[] | JobUncheckedCreateWithoutClientInput[]
    connectOrCreate?: JobCreateOrConnectWithoutClientInput | JobCreateOrConnectWithoutClientInput[]
    upsert?: JobUpsertWithWhereUniqueWithoutClientInput | JobUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: JobCreateManyClientInputEnvelope
    set?: JobWhereUniqueInput | JobWhereUniqueInput[]
    disconnect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    delete?: JobWhereUniqueInput | JobWhereUniqueInput[]
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    update?: JobUpdateWithWhereUniqueWithoutClientInput | JobUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: JobUpdateManyWithWhereWithoutClientInput | JobUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: JobScalarWhereInput | JobScalarWhereInput[]
  }

  export type ProposalUpdateManyWithoutFreelancerNestedInput = {
    create?: XOR<ProposalCreateWithoutFreelancerInput, ProposalUncheckedCreateWithoutFreelancerInput> | ProposalCreateWithoutFreelancerInput[] | ProposalUncheckedCreateWithoutFreelancerInput[]
    connectOrCreate?: ProposalCreateOrConnectWithoutFreelancerInput | ProposalCreateOrConnectWithoutFreelancerInput[]
    upsert?: ProposalUpsertWithWhereUniqueWithoutFreelancerInput | ProposalUpsertWithWhereUniqueWithoutFreelancerInput[]
    createMany?: ProposalCreateManyFreelancerInputEnvelope
    set?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[]
    disconnect?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[]
    delete?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[]
    connect?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[]
    update?: ProposalUpdateWithWhereUniqueWithoutFreelancerInput | ProposalUpdateWithWhereUniqueWithoutFreelancerInput[]
    updateMany?: ProposalUpdateManyWithWhereWithoutFreelancerInput | ProposalUpdateManyWithWhereWithoutFreelancerInput[]
    deleteMany?: ProposalScalarWhereInput | ProposalScalarWhereInput[]
  }

  export type ReviewUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<ReviewCreateWithoutAuthorInput, ReviewUncheckedCreateWithoutAuthorInput> | ReviewCreateWithoutAuthorInput[] | ReviewUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutAuthorInput | ReviewCreateOrConnectWithoutAuthorInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutAuthorInput | ReviewUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: ReviewCreateManyAuthorInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutAuthorInput | ReviewUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutAuthorInput | ReviewUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type ReviewUpdateManyWithoutReceiverNestedInput = {
    create?: XOR<ReviewCreateWithoutReceiverInput, ReviewUncheckedCreateWithoutReceiverInput> | ReviewCreateWithoutReceiverInput[] | ReviewUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutReceiverInput | ReviewCreateOrConnectWithoutReceiverInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutReceiverInput | ReviewUpsertWithWhereUniqueWithoutReceiverInput[]
    createMany?: ReviewCreateManyReceiverInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutReceiverInput | ReviewUpdateWithWhereUniqueWithoutReceiverInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutReceiverInput | ReviewUpdateManyWithWhereWithoutReceiverInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type MessageUpdateManyWithoutSenderNestedInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutSenderInput | MessageUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutSenderInput | MessageUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutSenderInput | MessageUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type MessageUpdateManyWithoutReceiverNestedInput = {
    create?: XOR<MessageCreateWithoutReceiverInput, MessageUncheckedCreateWithoutReceiverInput> | MessageCreateWithoutReceiverInput[] | MessageUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutReceiverInput | MessageCreateOrConnectWithoutReceiverInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutReceiverInput | MessageUpsertWithWhereUniqueWithoutReceiverInput[]
    createMany?: MessageCreateManyReceiverInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutReceiverInput | MessageUpdateWithWhereUniqueWithoutReceiverInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutReceiverInput | MessageUpdateManyWithWhereWithoutReceiverInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type SavedFreelancerUpdateManyWithoutUserNestedInput = {
    create?: XOR<SavedFreelancerCreateWithoutUserInput, SavedFreelancerUncheckedCreateWithoutUserInput> | SavedFreelancerCreateWithoutUserInput[] | SavedFreelancerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SavedFreelancerCreateOrConnectWithoutUserInput | SavedFreelancerCreateOrConnectWithoutUserInput[]
    upsert?: SavedFreelancerUpsertWithWhereUniqueWithoutUserInput | SavedFreelancerUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SavedFreelancerCreateManyUserInputEnvelope
    set?: SavedFreelancerWhereUniqueInput | SavedFreelancerWhereUniqueInput[]
    disconnect?: SavedFreelancerWhereUniqueInput | SavedFreelancerWhereUniqueInput[]
    delete?: SavedFreelancerWhereUniqueInput | SavedFreelancerWhereUniqueInput[]
    connect?: SavedFreelancerWhereUniqueInput | SavedFreelancerWhereUniqueInput[]
    update?: SavedFreelancerUpdateWithWhereUniqueWithoutUserInput | SavedFreelancerUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SavedFreelancerUpdateManyWithWhereWithoutUserInput | SavedFreelancerUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SavedFreelancerScalarWhereInput | SavedFreelancerScalarWhereInput[]
  }

  export type SavedFreelancerUpdateManyWithoutFreelancerNestedInput = {
    create?: XOR<SavedFreelancerCreateWithoutFreelancerInput, SavedFreelancerUncheckedCreateWithoutFreelancerInput> | SavedFreelancerCreateWithoutFreelancerInput[] | SavedFreelancerUncheckedCreateWithoutFreelancerInput[]
    connectOrCreate?: SavedFreelancerCreateOrConnectWithoutFreelancerInput | SavedFreelancerCreateOrConnectWithoutFreelancerInput[]
    upsert?: SavedFreelancerUpsertWithWhereUniqueWithoutFreelancerInput | SavedFreelancerUpsertWithWhereUniqueWithoutFreelancerInput[]
    createMany?: SavedFreelancerCreateManyFreelancerInputEnvelope
    set?: SavedFreelancerWhereUniqueInput | SavedFreelancerWhereUniqueInput[]
    disconnect?: SavedFreelancerWhereUniqueInput | SavedFreelancerWhereUniqueInput[]
    delete?: SavedFreelancerWhereUniqueInput | SavedFreelancerWhereUniqueInput[]
    connect?: SavedFreelancerWhereUniqueInput | SavedFreelancerWhereUniqueInput[]
    update?: SavedFreelancerUpdateWithWhereUniqueWithoutFreelancerInput | SavedFreelancerUpdateWithWhereUniqueWithoutFreelancerInput[]
    updateMany?: SavedFreelancerUpdateManyWithWhereWithoutFreelancerInput | SavedFreelancerUpdateManyWithWhereWithoutFreelancerInput[]
    deleteMany?: SavedFreelancerScalarWhereInput | SavedFreelancerScalarWhereInput[]
  }

  export type JobUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<JobCreateWithoutClientInput, JobUncheckedCreateWithoutClientInput> | JobCreateWithoutClientInput[] | JobUncheckedCreateWithoutClientInput[]
    connectOrCreate?: JobCreateOrConnectWithoutClientInput | JobCreateOrConnectWithoutClientInput[]
    upsert?: JobUpsertWithWhereUniqueWithoutClientInput | JobUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: JobCreateManyClientInputEnvelope
    set?: JobWhereUniqueInput | JobWhereUniqueInput[]
    disconnect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    delete?: JobWhereUniqueInput | JobWhereUniqueInput[]
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    update?: JobUpdateWithWhereUniqueWithoutClientInput | JobUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: JobUpdateManyWithWhereWithoutClientInput | JobUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: JobScalarWhereInput | JobScalarWhereInput[]
  }

  export type ProposalUncheckedUpdateManyWithoutFreelancerNestedInput = {
    create?: XOR<ProposalCreateWithoutFreelancerInput, ProposalUncheckedCreateWithoutFreelancerInput> | ProposalCreateWithoutFreelancerInput[] | ProposalUncheckedCreateWithoutFreelancerInput[]
    connectOrCreate?: ProposalCreateOrConnectWithoutFreelancerInput | ProposalCreateOrConnectWithoutFreelancerInput[]
    upsert?: ProposalUpsertWithWhereUniqueWithoutFreelancerInput | ProposalUpsertWithWhereUniqueWithoutFreelancerInput[]
    createMany?: ProposalCreateManyFreelancerInputEnvelope
    set?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[]
    disconnect?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[]
    delete?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[]
    connect?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[]
    update?: ProposalUpdateWithWhereUniqueWithoutFreelancerInput | ProposalUpdateWithWhereUniqueWithoutFreelancerInput[]
    updateMany?: ProposalUpdateManyWithWhereWithoutFreelancerInput | ProposalUpdateManyWithWhereWithoutFreelancerInput[]
    deleteMany?: ProposalScalarWhereInput | ProposalScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<ReviewCreateWithoutAuthorInput, ReviewUncheckedCreateWithoutAuthorInput> | ReviewCreateWithoutAuthorInput[] | ReviewUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutAuthorInput | ReviewCreateOrConnectWithoutAuthorInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutAuthorInput | ReviewUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: ReviewCreateManyAuthorInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutAuthorInput | ReviewUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutAuthorInput | ReviewUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutReceiverNestedInput = {
    create?: XOR<ReviewCreateWithoutReceiverInput, ReviewUncheckedCreateWithoutReceiverInput> | ReviewCreateWithoutReceiverInput[] | ReviewUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutReceiverInput | ReviewCreateOrConnectWithoutReceiverInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutReceiverInput | ReviewUpsertWithWhereUniqueWithoutReceiverInput[]
    createMany?: ReviewCreateManyReceiverInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutReceiverInput | ReviewUpdateWithWhereUniqueWithoutReceiverInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutReceiverInput | ReviewUpdateManyWithWhereWithoutReceiverInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutSenderNestedInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutSenderInput | MessageUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutSenderInput | MessageUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutSenderInput | MessageUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutReceiverNestedInput = {
    create?: XOR<MessageCreateWithoutReceiverInput, MessageUncheckedCreateWithoutReceiverInput> | MessageCreateWithoutReceiverInput[] | MessageUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutReceiverInput | MessageCreateOrConnectWithoutReceiverInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutReceiverInput | MessageUpsertWithWhereUniqueWithoutReceiverInput[]
    createMany?: MessageCreateManyReceiverInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutReceiverInput | MessageUpdateWithWhereUniqueWithoutReceiverInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutReceiverInput | MessageUpdateManyWithWhereWithoutReceiverInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type SavedFreelancerUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SavedFreelancerCreateWithoutUserInput, SavedFreelancerUncheckedCreateWithoutUserInput> | SavedFreelancerCreateWithoutUserInput[] | SavedFreelancerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SavedFreelancerCreateOrConnectWithoutUserInput | SavedFreelancerCreateOrConnectWithoutUserInput[]
    upsert?: SavedFreelancerUpsertWithWhereUniqueWithoutUserInput | SavedFreelancerUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SavedFreelancerCreateManyUserInputEnvelope
    set?: SavedFreelancerWhereUniqueInput | SavedFreelancerWhereUniqueInput[]
    disconnect?: SavedFreelancerWhereUniqueInput | SavedFreelancerWhereUniqueInput[]
    delete?: SavedFreelancerWhereUniqueInput | SavedFreelancerWhereUniqueInput[]
    connect?: SavedFreelancerWhereUniqueInput | SavedFreelancerWhereUniqueInput[]
    update?: SavedFreelancerUpdateWithWhereUniqueWithoutUserInput | SavedFreelancerUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SavedFreelancerUpdateManyWithWhereWithoutUserInput | SavedFreelancerUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SavedFreelancerScalarWhereInput | SavedFreelancerScalarWhereInput[]
  }

  export type SavedFreelancerUncheckedUpdateManyWithoutFreelancerNestedInput = {
    create?: XOR<SavedFreelancerCreateWithoutFreelancerInput, SavedFreelancerUncheckedCreateWithoutFreelancerInput> | SavedFreelancerCreateWithoutFreelancerInput[] | SavedFreelancerUncheckedCreateWithoutFreelancerInput[]
    connectOrCreate?: SavedFreelancerCreateOrConnectWithoutFreelancerInput | SavedFreelancerCreateOrConnectWithoutFreelancerInput[]
    upsert?: SavedFreelancerUpsertWithWhereUniqueWithoutFreelancerInput | SavedFreelancerUpsertWithWhereUniqueWithoutFreelancerInput[]
    createMany?: SavedFreelancerCreateManyFreelancerInputEnvelope
    set?: SavedFreelancerWhereUniqueInput | SavedFreelancerWhereUniqueInput[]
    disconnect?: SavedFreelancerWhereUniqueInput | SavedFreelancerWhereUniqueInput[]
    delete?: SavedFreelancerWhereUniqueInput | SavedFreelancerWhereUniqueInput[]
    connect?: SavedFreelancerWhereUniqueInput | SavedFreelancerWhereUniqueInput[]
    update?: SavedFreelancerUpdateWithWhereUniqueWithoutFreelancerInput | SavedFreelancerUpdateWithWhereUniqueWithoutFreelancerInput[]
    updateMany?: SavedFreelancerUpdateManyWithWhereWithoutFreelancerInput | SavedFreelancerUpdateManyWithWhereWithoutFreelancerInput[]
    deleteMany?: SavedFreelancerScalarWhereInput | SavedFreelancerScalarWhereInput[]
  }

  export type JobCreaterequirementsInput = {
    set: string[]
  }

  export type JobCreateskillsInput = {
    set: string[]
  }

  export type JobCreatecommunicationPreferencesInput = {
    set: string[]
  }

  export type ConversationCreateNestedManyWithoutJobInput = {
    create?: XOR<ConversationCreateWithoutJobInput, ConversationUncheckedCreateWithoutJobInput> | ConversationCreateWithoutJobInput[] | ConversationUncheckedCreateWithoutJobInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutJobInput | ConversationCreateOrConnectWithoutJobInput[]
    createMany?: ConversationCreateManyJobInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutJobsPostedInput = {
    create?: XOR<UserCreateWithoutJobsPostedInput, UserUncheckedCreateWithoutJobsPostedInput>
    connectOrCreate?: UserCreateOrConnectWithoutJobsPostedInput
    connect?: UserWhereUniqueInput
  }

  export type ProposalCreateNestedManyWithoutJobInput = {
    create?: XOR<ProposalCreateWithoutJobInput, ProposalUncheckedCreateWithoutJobInput> | ProposalCreateWithoutJobInput[] | ProposalUncheckedCreateWithoutJobInput[]
    connectOrCreate?: ProposalCreateOrConnectWithoutJobInput | ProposalCreateOrConnectWithoutJobInput[]
    createMany?: ProposalCreateManyJobInputEnvelope
    connect?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[]
  }

  export type ReviewCreateNestedManyWithoutJobInput = {
    create?: XOR<ReviewCreateWithoutJobInput, ReviewUncheckedCreateWithoutJobInput> | ReviewCreateWithoutJobInput[] | ReviewUncheckedCreateWithoutJobInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutJobInput | ReviewCreateOrConnectWithoutJobInput[]
    createMany?: ReviewCreateManyJobInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type ConversationUncheckedCreateNestedManyWithoutJobInput = {
    create?: XOR<ConversationCreateWithoutJobInput, ConversationUncheckedCreateWithoutJobInput> | ConversationCreateWithoutJobInput[] | ConversationUncheckedCreateWithoutJobInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutJobInput | ConversationCreateOrConnectWithoutJobInput[]
    createMany?: ConversationCreateManyJobInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type ProposalUncheckedCreateNestedManyWithoutJobInput = {
    create?: XOR<ProposalCreateWithoutJobInput, ProposalUncheckedCreateWithoutJobInput> | ProposalCreateWithoutJobInput[] | ProposalUncheckedCreateWithoutJobInput[]
    connectOrCreate?: ProposalCreateOrConnectWithoutJobInput | ProposalCreateOrConnectWithoutJobInput[]
    createMany?: ProposalCreateManyJobInputEnvelope
    connect?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutJobInput = {
    create?: XOR<ReviewCreateWithoutJobInput, ReviewUncheckedCreateWithoutJobInput> | ReviewCreateWithoutJobInput[] | ReviewUncheckedCreateWithoutJobInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutJobInput | ReviewCreateOrConnectWithoutJobInput[]
    createMany?: ReviewCreateManyJobInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type JobUpdaterequirementsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumBudgetTypeFieldUpdateOperationsInput = {
    set?: $Enums.BudgetType
  }

  export type JobUpdateskillsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type JobUpdatecommunicationPreferencesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumJobStatusFieldUpdateOperationsInput = {
    set?: $Enums.JobStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ConversationUpdateManyWithoutJobNestedInput = {
    create?: XOR<ConversationCreateWithoutJobInput, ConversationUncheckedCreateWithoutJobInput> | ConversationCreateWithoutJobInput[] | ConversationUncheckedCreateWithoutJobInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutJobInput | ConversationCreateOrConnectWithoutJobInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutJobInput | ConversationUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: ConversationCreateManyJobInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutJobInput | ConversationUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutJobInput | ConversationUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutJobsPostedNestedInput = {
    create?: XOR<UserCreateWithoutJobsPostedInput, UserUncheckedCreateWithoutJobsPostedInput>
    connectOrCreate?: UserCreateOrConnectWithoutJobsPostedInput
    upsert?: UserUpsertWithoutJobsPostedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutJobsPostedInput, UserUpdateWithoutJobsPostedInput>, UserUncheckedUpdateWithoutJobsPostedInput>
  }

  export type ProposalUpdateManyWithoutJobNestedInput = {
    create?: XOR<ProposalCreateWithoutJobInput, ProposalUncheckedCreateWithoutJobInput> | ProposalCreateWithoutJobInput[] | ProposalUncheckedCreateWithoutJobInput[]
    connectOrCreate?: ProposalCreateOrConnectWithoutJobInput | ProposalCreateOrConnectWithoutJobInput[]
    upsert?: ProposalUpsertWithWhereUniqueWithoutJobInput | ProposalUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: ProposalCreateManyJobInputEnvelope
    set?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[]
    disconnect?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[]
    delete?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[]
    connect?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[]
    update?: ProposalUpdateWithWhereUniqueWithoutJobInput | ProposalUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: ProposalUpdateManyWithWhereWithoutJobInput | ProposalUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: ProposalScalarWhereInput | ProposalScalarWhereInput[]
  }

  export type ReviewUpdateManyWithoutJobNestedInput = {
    create?: XOR<ReviewCreateWithoutJobInput, ReviewUncheckedCreateWithoutJobInput> | ReviewCreateWithoutJobInput[] | ReviewUncheckedCreateWithoutJobInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutJobInput | ReviewCreateOrConnectWithoutJobInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutJobInput | ReviewUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: ReviewCreateManyJobInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutJobInput | ReviewUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutJobInput | ReviewUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type ConversationUncheckedUpdateManyWithoutJobNestedInput = {
    create?: XOR<ConversationCreateWithoutJobInput, ConversationUncheckedCreateWithoutJobInput> | ConversationCreateWithoutJobInput[] | ConversationUncheckedCreateWithoutJobInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutJobInput | ConversationCreateOrConnectWithoutJobInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutJobInput | ConversationUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: ConversationCreateManyJobInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutJobInput | ConversationUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutJobInput | ConversationUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type ProposalUncheckedUpdateManyWithoutJobNestedInput = {
    create?: XOR<ProposalCreateWithoutJobInput, ProposalUncheckedCreateWithoutJobInput> | ProposalCreateWithoutJobInput[] | ProposalUncheckedCreateWithoutJobInput[]
    connectOrCreate?: ProposalCreateOrConnectWithoutJobInput | ProposalCreateOrConnectWithoutJobInput[]
    upsert?: ProposalUpsertWithWhereUniqueWithoutJobInput | ProposalUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: ProposalCreateManyJobInputEnvelope
    set?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[]
    disconnect?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[]
    delete?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[]
    connect?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[]
    update?: ProposalUpdateWithWhereUniqueWithoutJobInput | ProposalUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: ProposalUpdateManyWithWhereWithoutJobInput | ProposalUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: ProposalScalarWhereInput | ProposalScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutJobNestedInput = {
    create?: XOR<ReviewCreateWithoutJobInput, ReviewUncheckedCreateWithoutJobInput> | ReviewCreateWithoutJobInput[] | ReviewUncheckedCreateWithoutJobInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutJobInput | ReviewCreateOrConnectWithoutJobInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutJobInput | ReviewUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: ReviewCreateManyJobInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutJobInput | ReviewUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutJobInput | ReviewUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type ProposalCreateattachmentsInput = {
    set: string[]
  }

  export type JobCreateNestedOneWithoutProposalsInput = {
    create?: XOR<JobCreateWithoutProposalsInput, JobUncheckedCreateWithoutProposalsInput>
    connectOrCreate?: JobCreateOrConnectWithoutProposalsInput
    connect?: JobWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutProposalsInput = {
    create?: XOR<UserCreateWithoutProposalsInput, UserUncheckedCreateWithoutProposalsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProposalsInput
    connect?: UserWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProposalUpdateattachmentsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumProposalStatusFieldUpdateOperationsInput = {
    set?: $Enums.ProposalStatus
  }

  export type JobUpdateOneRequiredWithoutProposalsNestedInput = {
    create?: XOR<JobCreateWithoutProposalsInput, JobUncheckedCreateWithoutProposalsInput>
    connectOrCreate?: JobCreateOrConnectWithoutProposalsInput
    upsert?: JobUpsertWithoutProposalsInput
    connect?: JobWhereUniqueInput
    update?: XOR<XOR<JobUpdateToOneWithWhereWithoutProposalsInput, JobUpdateWithoutProposalsInput>, JobUncheckedUpdateWithoutProposalsInput>
  }

  export type UserUpdateOneRequiredWithoutProposalsNestedInput = {
    create?: XOR<UserCreateWithoutProposalsInput, UserUncheckedCreateWithoutProposalsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProposalsInput
    upsert?: UserUpsertWithoutProposalsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProposalsInput, UserUpdateWithoutProposalsInput>, UserUncheckedUpdateWithoutProposalsInput>
  }

  export type UserCreateNestedOneWithoutReviewsInput = {
    create?: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReceivedReviewsInput = {
    create?: XOR<UserCreateWithoutReceivedReviewsInput, UserUncheckedCreateWithoutReceivedReviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedReviewsInput
    connect?: UserWhereUniqueInput
  }

  export type JobCreateNestedOneWithoutReviewsInput = {
    create?: XOR<JobCreateWithoutReviewsInput, JobUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: JobCreateOrConnectWithoutReviewsInput
    connect?: JobWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewsInput
    upsert?: UserUpsertWithoutReviewsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReviewsInput, UserUpdateWithoutReviewsInput>, UserUncheckedUpdateWithoutReviewsInput>
  }

  export type UserUpdateOneRequiredWithoutReceivedReviewsNestedInput = {
    create?: XOR<UserCreateWithoutReceivedReviewsInput, UserUncheckedCreateWithoutReceivedReviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedReviewsInput
    upsert?: UserUpsertWithoutReceivedReviewsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReceivedReviewsInput, UserUpdateWithoutReceivedReviewsInput>, UserUncheckedUpdateWithoutReceivedReviewsInput>
  }

  export type JobUpdateOneWithoutReviewsNestedInput = {
    create?: XOR<JobCreateWithoutReviewsInput, JobUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: JobCreateOrConnectWithoutReviewsInput
    upsert?: JobUpsertWithoutReviewsInput
    disconnect?: JobWhereInput | boolean
    delete?: JobWhereInput | boolean
    connect?: JobWhereUniqueInput
    update?: XOR<XOR<JobUpdateToOneWithWhereWithoutReviewsInput, JobUpdateWithoutReviewsInput>, JobUncheckedUpdateWithoutReviewsInput>
  }

  export type ConversationCreateparticipantsInput = {
    set: string[]
  }

  export type JobCreateNestedOneWithoutConversationInput = {
    create?: XOR<JobCreateWithoutConversationInput, JobUncheckedCreateWithoutConversationInput>
    connectOrCreate?: JobCreateOrConnectWithoutConversationInput
    connect?: JobWhereUniqueInput
  }

  export type MessageCreateNestedManyWithoutConversationInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type MessageCreateNestedOneWithoutConversationAsLastMessageInput = {
    create?: XOR<MessageCreateWithoutConversationAsLastMessageInput, MessageUncheckedCreateWithoutConversationAsLastMessageInput>
    connectOrCreate?: MessageCreateOrConnectWithoutConversationAsLastMessageInput
    connect?: MessageWhereUniqueInput
  }

  export type MessageUncheckedCreateNestedManyWithoutConversationInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type ConversationUpdateparticipantsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type JobUpdateOneWithoutConversationNestedInput = {
    create?: XOR<JobCreateWithoutConversationInput, JobUncheckedCreateWithoutConversationInput>
    connectOrCreate?: JobCreateOrConnectWithoutConversationInput
    upsert?: JobUpsertWithoutConversationInput
    disconnect?: JobWhereInput | boolean
    delete?: JobWhereInput | boolean
    connect?: JobWhereUniqueInput
    update?: XOR<XOR<JobUpdateToOneWithWhereWithoutConversationInput, JobUpdateWithoutConversationInput>, JobUncheckedUpdateWithoutConversationInput>
  }

  export type MessageUpdateManyWithoutConversationNestedInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutConversationInput | MessageUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutConversationInput | MessageUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutConversationInput | MessageUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type MessageUpdateOneWithoutConversationAsLastMessageNestedInput = {
    create?: XOR<MessageCreateWithoutConversationAsLastMessageInput, MessageUncheckedCreateWithoutConversationAsLastMessageInput>
    connectOrCreate?: MessageCreateOrConnectWithoutConversationAsLastMessageInput
    upsert?: MessageUpsertWithoutConversationAsLastMessageInput
    disconnect?: MessageWhereInput | boolean
    delete?: MessageWhereInput | boolean
    connect?: MessageWhereUniqueInput
    update?: XOR<XOR<MessageUpdateToOneWithWhereWithoutConversationAsLastMessageInput, MessageUpdateWithoutConversationAsLastMessageInput>, MessageUncheckedUpdateWithoutConversationAsLastMessageInput>
  }

  export type MessageUncheckedUpdateManyWithoutConversationNestedInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutConversationInput | MessageUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutConversationInput | MessageUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutConversationInput | MessageUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutMessagesInput = {
    create?: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessagesInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReceivedMessagesInput = {
    create?: XOR<UserCreateWithoutReceivedMessagesInput, UserUncheckedCreateWithoutReceivedMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedMessagesInput
    connect?: UserWhereUniqueInput
  }

  export type ConversationCreateNestedOneWithoutMessagesInput = {
    create?: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutMessagesInput
    connect?: ConversationWhereUniqueInput
  }

  export type ConversationCreateNestedManyWithoutLastMessageInput = {
    create?: XOR<ConversationCreateWithoutLastMessageInput, ConversationUncheckedCreateWithoutLastMessageInput> | ConversationCreateWithoutLastMessageInput[] | ConversationUncheckedCreateWithoutLastMessageInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutLastMessageInput | ConversationCreateOrConnectWithoutLastMessageInput[]
    createMany?: ConversationCreateManyLastMessageInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type ConversationUncheckedCreateNestedManyWithoutLastMessageInput = {
    create?: XOR<ConversationCreateWithoutLastMessageInput, ConversationUncheckedCreateWithoutLastMessageInput> | ConversationCreateWithoutLastMessageInput[] | ConversationUncheckedCreateWithoutLastMessageInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutLastMessageInput | ConversationCreateOrConnectWithoutLastMessageInput[]
    createMany?: ConversationCreateManyLastMessageInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessagesInput
    upsert?: UserUpsertWithoutMessagesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMessagesInput, UserUpdateWithoutMessagesInput>, UserUncheckedUpdateWithoutMessagesInput>
  }

  export type UserUpdateOneRequiredWithoutReceivedMessagesNestedInput = {
    create?: XOR<UserCreateWithoutReceivedMessagesInput, UserUncheckedCreateWithoutReceivedMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedMessagesInput
    upsert?: UserUpsertWithoutReceivedMessagesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReceivedMessagesInput, UserUpdateWithoutReceivedMessagesInput>, UserUncheckedUpdateWithoutReceivedMessagesInput>
  }

  export type ConversationUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutMessagesInput
    upsert?: ConversationUpsertWithoutMessagesInput
    connect?: ConversationWhereUniqueInput
    update?: XOR<XOR<ConversationUpdateToOneWithWhereWithoutMessagesInput, ConversationUpdateWithoutMessagesInput>, ConversationUncheckedUpdateWithoutMessagesInput>
  }

  export type ConversationUpdateManyWithoutLastMessageNestedInput = {
    create?: XOR<ConversationCreateWithoutLastMessageInput, ConversationUncheckedCreateWithoutLastMessageInput> | ConversationCreateWithoutLastMessageInput[] | ConversationUncheckedCreateWithoutLastMessageInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutLastMessageInput | ConversationCreateOrConnectWithoutLastMessageInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutLastMessageInput | ConversationUpsertWithWhereUniqueWithoutLastMessageInput[]
    createMany?: ConversationCreateManyLastMessageInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutLastMessageInput | ConversationUpdateWithWhereUniqueWithoutLastMessageInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutLastMessageInput | ConversationUpdateManyWithWhereWithoutLastMessageInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type ConversationUncheckedUpdateManyWithoutLastMessageNestedInput = {
    create?: XOR<ConversationCreateWithoutLastMessageInput, ConversationUncheckedCreateWithoutLastMessageInput> | ConversationCreateWithoutLastMessageInput[] | ConversationUncheckedCreateWithoutLastMessageInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutLastMessageInput | ConversationCreateOrConnectWithoutLastMessageInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutLastMessageInput | ConversationUpsertWithWhereUniqueWithoutLastMessageInput[]
    createMany?: ConversationCreateManyLastMessageInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutLastMessageInput | ConversationUpdateWithWhereUniqueWithoutLastMessageInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutLastMessageInput | ConversationUpdateManyWithWhereWithoutLastMessageInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumNotificationTypeFieldUpdateOperationsInput = {
    set?: $Enums.NotificationType
  }

  export type UserUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    upsert?: UserUpsertWithoutNotificationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotificationsInput, UserUpdateWithoutNotificationsInput>, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserCreateNestedOneWithoutSavedFreelancersInput = {
    create?: XOR<UserCreateWithoutSavedFreelancersInput, UserUncheckedCreateWithoutSavedFreelancersInput>
    connectOrCreate?: UserCreateOrConnectWithoutSavedFreelancersInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSavedByUsersInput = {
    create?: XOR<UserCreateWithoutSavedByUsersInput, UserUncheckedCreateWithoutSavedByUsersInput>
    connectOrCreate?: UserCreateOrConnectWithoutSavedByUsersInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSavedFreelancersNestedInput = {
    create?: XOR<UserCreateWithoutSavedFreelancersInput, UserUncheckedCreateWithoutSavedFreelancersInput>
    connectOrCreate?: UserCreateOrConnectWithoutSavedFreelancersInput
    upsert?: UserUpsertWithoutSavedFreelancersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSavedFreelancersInput, UserUpdateWithoutSavedFreelancersInput>, UserUncheckedUpdateWithoutSavedFreelancersInput>
  }

  export type UserUpdateOneRequiredWithoutSavedByUsersNestedInput = {
    create?: XOR<UserCreateWithoutSavedByUsersInput, UserUncheckedCreateWithoutSavedByUsersInput>
    connectOrCreate?: UserCreateOrConnectWithoutSavedByUsersInput
    upsert?: UserUpsertWithoutSavedByUsersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSavedByUsersInput, UserUpdateWithoutSavedByUsersInput>, UserUncheckedUpdateWithoutSavedByUsersInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumUserTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUserTypeFilter<$PrismaModel> | $Enums.UserType
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumUserTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUserTypeWithAggregatesFilter<$PrismaModel> | $Enums.UserType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserTypeFilter<$PrismaModel>
    _max?: NestedEnumUserTypeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedEnumBudgetTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.BudgetType | EnumBudgetTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BudgetType[] | ListEnumBudgetTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BudgetType[] | ListEnumBudgetTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBudgetTypeFilter<$PrismaModel> | $Enums.BudgetType
  }

  export type NestedEnumJobStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusFilter<$PrismaModel> | $Enums.JobStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumBudgetTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BudgetType | EnumBudgetTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BudgetType[] | ListEnumBudgetTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BudgetType[] | ListEnumBudgetTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBudgetTypeWithAggregatesFilter<$PrismaModel> | $Enums.BudgetType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBudgetTypeFilter<$PrismaModel>
    _max?: NestedEnumBudgetTypeFilter<$PrismaModel>
  }

  export type NestedEnumJobStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusWithAggregatesFilter<$PrismaModel> | $Enums.JobStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJobStatusFilter<$PrismaModel>
    _max?: NestedEnumJobStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumProposalStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProposalStatus | EnumProposalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProposalStatus[] | ListEnumProposalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProposalStatus[] | ListEnumProposalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProposalStatusFilter<$PrismaModel> | $Enums.ProposalStatus
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumProposalStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProposalStatus | EnumProposalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProposalStatus[] | ListEnumProposalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProposalStatus[] | ListEnumProposalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProposalStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProposalStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProposalStatusFilter<$PrismaModel>
    _max?: NestedEnumProposalStatusFilter<$PrismaModel>
  }

  export type NestedEnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType
  }

  export type NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationTypeFilter<$PrismaModel>
    _max?: NestedEnumNotificationTypeFilter<$PrismaModel>
  }

  export type JobCreateWithoutClientInput = {
    id?: string
    title: string
    description: string
    requirements?: JobCreaterequirementsInput | string[]
    budget: $Enums.BudgetType
    minBudget?: number | null
    maxBudget?: number | null
    hourlyRate?: number | null
    duration?: string | null
    skills?: JobCreateskillsInput | string[]
    category: string
    subcategory?: string | null
    projectType?: string | null
    experienceLevel?: string | null
    workingHours?: string | null
    timezone?: string | null
    communicationPreferences?: JobCreatecommunicationPreferencesInput | string[]
    location?: string | null
    isRemote?: boolean
    status?: $Enums.JobStatus
    isUrgent?: boolean
    visibility?: string
    applicationDeadline?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    conversation?: ConversationCreateNestedManyWithoutJobInput
    proposals?: ProposalCreateNestedManyWithoutJobInput
    reviews?: ReviewCreateNestedManyWithoutJobInput
  }

  export type JobUncheckedCreateWithoutClientInput = {
    id?: string
    title: string
    description: string
    requirements?: JobCreaterequirementsInput | string[]
    budget: $Enums.BudgetType
    minBudget?: number | null
    maxBudget?: number | null
    hourlyRate?: number | null
    duration?: string | null
    skills?: JobCreateskillsInput | string[]
    category: string
    subcategory?: string | null
    projectType?: string | null
    experienceLevel?: string | null
    workingHours?: string | null
    timezone?: string | null
    communicationPreferences?: JobCreatecommunicationPreferencesInput | string[]
    location?: string | null
    isRemote?: boolean
    status?: $Enums.JobStatus
    isUrgent?: boolean
    visibility?: string
    applicationDeadline?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    conversation?: ConversationUncheckedCreateNestedManyWithoutJobInput
    proposals?: ProposalUncheckedCreateNestedManyWithoutJobInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutJobInput
  }

  export type JobCreateOrConnectWithoutClientInput = {
    where: JobWhereUniqueInput
    create: XOR<JobCreateWithoutClientInput, JobUncheckedCreateWithoutClientInput>
  }

  export type JobCreateManyClientInputEnvelope = {
    data: JobCreateManyClientInput | JobCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type ProposalCreateWithoutFreelancerInput = {
    id?: string
    coverLetter: string
    bidAmount: number
    estimatedDuration: string
    attachments?: ProposalCreateattachmentsInput | string[]
    status?: $Enums.ProposalStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    questionResponses?: NullableJsonNullValueInput | InputJsonValue
    milestones?: NullableJsonNullValueInput | InputJsonValue
    clientNotes?: string | null
    clientViewed?: boolean
    rating?: number | null
    interview?: NullableJsonNullValueInput | InputJsonValue
    originalBudget?: number | null
    isShortlisted?: boolean
    job: JobCreateNestedOneWithoutProposalsInput
  }

  export type ProposalUncheckedCreateWithoutFreelancerInput = {
    id?: string
    coverLetter: string
    bidAmount: number
    estimatedDuration: string
    attachments?: ProposalCreateattachmentsInput | string[]
    status?: $Enums.ProposalStatus
    jobId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    questionResponses?: NullableJsonNullValueInput | InputJsonValue
    milestones?: NullableJsonNullValueInput | InputJsonValue
    clientNotes?: string | null
    clientViewed?: boolean
    rating?: number | null
    interview?: NullableJsonNullValueInput | InputJsonValue
    originalBudget?: number | null
    isShortlisted?: boolean
  }

  export type ProposalCreateOrConnectWithoutFreelancerInput = {
    where: ProposalWhereUniqueInput
    create: XOR<ProposalCreateWithoutFreelancerInput, ProposalUncheckedCreateWithoutFreelancerInput>
  }

  export type ProposalCreateManyFreelancerInputEnvelope = {
    data: ProposalCreateManyFreelancerInput | ProposalCreateManyFreelancerInput[]
    skipDuplicates?: boolean
  }

  export type ReviewCreateWithoutAuthorInput = {
    id?: string
    rating: number
    comment: string
    createdAt?: Date | string
    updatedAt?: Date | string
    receiver: UserCreateNestedOneWithoutReceivedReviewsInput
    job?: JobCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateWithoutAuthorInput = {
    id?: string
    rating: number
    comment: string
    receiverId: string
    jobId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewCreateOrConnectWithoutAuthorInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutAuthorInput, ReviewUncheckedCreateWithoutAuthorInput>
  }

  export type ReviewCreateManyAuthorInputEnvelope = {
    data: ReviewCreateManyAuthorInput | ReviewCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type ReviewCreateWithoutReceiverInput = {
    id?: string
    rating: number
    comment: string
    createdAt?: Date | string
    updatedAt?: Date | string
    author: UserCreateNestedOneWithoutReviewsInput
    job?: JobCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateWithoutReceiverInput = {
    id?: string
    rating: number
    comment: string
    authorId: string
    jobId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewCreateOrConnectWithoutReceiverInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutReceiverInput, ReviewUncheckedCreateWithoutReceiverInput>
  }

  export type ReviewCreateManyReceiverInputEnvelope = {
    data: ReviewCreateManyReceiverInput | ReviewCreateManyReceiverInput[]
    skipDuplicates?: boolean
  }

  export type MessageCreateWithoutSenderInput = {
    id?: string
    content: string
    isRead?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    receiver: UserCreateNestedOneWithoutReceivedMessagesInput
    conversation: ConversationCreateNestedOneWithoutMessagesInput
    conversationAsLastMessage?: ConversationCreateNestedManyWithoutLastMessageInput
  }

  export type MessageUncheckedCreateWithoutSenderInput = {
    id?: string
    content: string
    receiverEmail: string
    conversationId: string
    isRead?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    conversationAsLastMessage?: ConversationUncheckedCreateNestedManyWithoutLastMessageInput
  }

  export type MessageCreateOrConnectWithoutSenderInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput>
  }

  export type MessageCreateManySenderInputEnvelope = {
    data: MessageCreateManySenderInput | MessageCreateManySenderInput[]
    skipDuplicates?: boolean
  }

  export type MessageCreateWithoutReceiverInput = {
    id?: string
    content: string
    isRead?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sender: UserCreateNestedOneWithoutMessagesInput
    conversation: ConversationCreateNestedOneWithoutMessagesInput
    conversationAsLastMessage?: ConversationCreateNestedManyWithoutLastMessageInput
  }

  export type MessageUncheckedCreateWithoutReceiverInput = {
    id?: string
    content: string
    senderEmail: string
    conversationId: string
    isRead?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    conversationAsLastMessage?: ConversationUncheckedCreateNestedManyWithoutLastMessageInput
  }

  export type MessageCreateOrConnectWithoutReceiverInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutReceiverInput, MessageUncheckedCreateWithoutReceiverInput>
  }

  export type MessageCreateManyReceiverInputEnvelope = {
    data: MessageCreateManyReceiverInput | MessageCreateManyReceiverInput[]
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutUserInput = {
    id?: string
    title: string
    message: string
    type: $Enums.NotificationType
    isRead?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    message: string
    type: $Enums.NotificationType
    isRead?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutUserInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationCreateManyUserInputEnvelope = {
    data: NotificationCreateManyUserInput | NotificationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SavedFreelancerCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    freelancer: UserCreateNestedOneWithoutSavedByUsersInput
  }

  export type SavedFreelancerUncheckedCreateWithoutUserInput = {
    id?: string
    freelancerId: string
    createdAt?: Date | string
  }

  export type SavedFreelancerCreateOrConnectWithoutUserInput = {
    where: SavedFreelancerWhereUniqueInput
    create: XOR<SavedFreelancerCreateWithoutUserInput, SavedFreelancerUncheckedCreateWithoutUserInput>
  }

  export type SavedFreelancerCreateManyUserInputEnvelope = {
    data: SavedFreelancerCreateManyUserInput | SavedFreelancerCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SavedFreelancerCreateWithoutFreelancerInput = {
    id?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSavedFreelancersInput
  }

  export type SavedFreelancerUncheckedCreateWithoutFreelancerInput = {
    id?: string
    userId: string
    createdAt?: Date | string
  }

  export type SavedFreelancerCreateOrConnectWithoutFreelancerInput = {
    where: SavedFreelancerWhereUniqueInput
    create: XOR<SavedFreelancerCreateWithoutFreelancerInput, SavedFreelancerUncheckedCreateWithoutFreelancerInput>
  }

  export type SavedFreelancerCreateManyFreelancerInputEnvelope = {
    data: SavedFreelancerCreateManyFreelancerInput | SavedFreelancerCreateManyFreelancerInput[]
    skipDuplicates?: boolean
  }

  export type JobUpsertWithWhereUniqueWithoutClientInput = {
    where: JobWhereUniqueInput
    update: XOR<JobUpdateWithoutClientInput, JobUncheckedUpdateWithoutClientInput>
    create: XOR<JobCreateWithoutClientInput, JobUncheckedCreateWithoutClientInput>
  }

  export type JobUpdateWithWhereUniqueWithoutClientInput = {
    where: JobWhereUniqueInput
    data: XOR<JobUpdateWithoutClientInput, JobUncheckedUpdateWithoutClientInput>
  }

  export type JobUpdateManyWithWhereWithoutClientInput = {
    where: JobScalarWhereInput
    data: XOR<JobUpdateManyMutationInput, JobUncheckedUpdateManyWithoutClientInput>
  }

  export type JobScalarWhereInput = {
    AND?: JobScalarWhereInput | JobScalarWhereInput[]
    OR?: JobScalarWhereInput[]
    NOT?: JobScalarWhereInput | JobScalarWhereInput[]
    id?: StringFilter<"Job"> | string
    title?: StringFilter<"Job"> | string
    description?: StringFilter<"Job"> | string
    requirements?: StringNullableListFilter<"Job">
    budget?: EnumBudgetTypeFilter<"Job"> | $Enums.BudgetType
    minBudget?: FloatNullableFilter<"Job"> | number | null
    maxBudget?: FloatNullableFilter<"Job"> | number | null
    hourlyRate?: FloatNullableFilter<"Job"> | number | null
    duration?: StringNullableFilter<"Job"> | string | null
    skills?: StringNullableListFilter<"Job">
    category?: StringFilter<"Job"> | string
    subcategory?: StringNullableFilter<"Job"> | string | null
    projectType?: StringNullableFilter<"Job"> | string | null
    experienceLevel?: StringNullableFilter<"Job"> | string | null
    workingHours?: StringNullableFilter<"Job"> | string | null
    timezone?: StringNullableFilter<"Job"> | string | null
    communicationPreferences?: StringNullableListFilter<"Job">
    location?: StringNullableFilter<"Job"> | string | null
    isRemote?: BoolFilter<"Job"> | boolean
    status?: EnumJobStatusFilter<"Job"> | $Enums.JobStatus
    isUrgent?: BoolFilter<"Job"> | boolean
    visibility?: StringFilter<"Job"> | string
    applicationDeadline?: DateTimeNullableFilter<"Job"> | Date | string | null
    clientId?: StringFilter<"Job"> | string
    createdAt?: DateTimeFilter<"Job"> | Date | string
    updatedAt?: DateTimeFilter<"Job"> | Date | string
  }

  export type ProposalUpsertWithWhereUniqueWithoutFreelancerInput = {
    where: ProposalWhereUniqueInput
    update: XOR<ProposalUpdateWithoutFreelancerInput, ProposalUncheckedUpdateWithoutFreelancerInput>
    create: XOR<ProposalCreateWithoutFreelancerInput, ProposalUncheckedCreateWithoutFreelancerInput>
  }

  export type ProposalUpdateWithWhereUniqueWithoutFreelancerInput = {
    where: ProposalWhereUniqueInput
    data: XOR<ProposalUpdateWithoutFreelancerInput, ProposalUncheckedUpdateWithoutFreelancerInput>
  }

  export type ProposalUpdateManyWithWhereWithoutFreelancerInput = {
    where: ProposalScalarWhereInput
    data: XOR<ProposalUpdateManyMutationInput, ProposalUncheckedUpdateManyWithoutFreelancerInput>
  }

  export type ProposalScalarWhereInput = {
    AND?: ProposalScalarWhereInput | ProposalScalarWhereInput[]
    OR?: ProposalScalarWhereInput[]
    NOT?: ProposalScalarWhereInput | ProposalScalarWhereInput[]
    id?: StringFilter<"Proposal"> | string
    coverLetter?: StringFilter<"Proposal"> | string
    bidAmount?: FloatFilter<"Proposal"> | number
    estimatedDuration?: StringFilter<"Proposal"> | string
    attachments?: StringNullableListFilter<"Proposal">
    status?: EnumProposalStatusFilter<"Proposal"> | $Enums.ProposalStatus
    jobId?: StringFilter<"Proposal"> | string
    freelancerId?: StringFilter<"Proposal"> | string
    createdAt?: DateTimeFilter<"Proposal"> | Date | string
    updatedAt?: DateTimeFilter<"Proposal"> | Date | string
    questionResponses?: JsonNullableFilter<"Proposal">
    milestones?: JsonNullableFilter<"Proposal">
    clientNotes?: StringNullableFilter<"Proposal"> | string | null
    clientViewed?: BoolFilter<"Proposal"> | boolean
    rating?: IntNullableFilter<"Proposal"> | number | null
    interview?: JsonNullableFilter<"Proposal">
    originalBudget?: FloatNullableFilter<"Proposal"> | number | null
    isShortlisted?: BoolFilter<"Proposal"> | boolean
  }

  export type ReviewUpsertWithWhereUniqueWithoutAuthorInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutAuthorInput, ReviewUncheckedUpdateWithoutAuthorInput>
    create: XOR<ReviewCreateWithoutAuthorInput, ReviewUncheckedCreateWithoutAuthorInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutAuthorInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutAuthorInput, ReviewUncheckedUpdateWithoutAuthorInput>
  }

  export type ReviewUpdateManyWithWhereWithoutAuthorInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutAuthorInput>
  }

  export type ReviewScalarWhereInput = {
    AND?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    OR?: ReviewScalarWhereInput[]
    NOT?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    id?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    comment?: StringFilter<"Review"> | string
    authorId?: StringFilter<"Review"> | string
    receiverId?: StringFilter<"Review"> | string
    jobId?: StringNullableFilter<"Review"> | string | null
    createdAt?: DateTimeFilter<"Review"> | Date | string
    updatedAt?: DateTimeFilter<"Review"> | Date | string
  }

  export type ReviewUpsertWithWhereUniqueWithoutReceiverInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutReceiverInput, ReviewUncheckedUpdateWithoutReceiverInput>
    create: XOR<ReviewCreateWithoutReceiverInput, ReviewUncheckedCreateWithoutReceiverInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutReceiverInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutReceiverInput, ReviewUncheckedUpdateWithoutReceiverInput>
  }

  export type ReviewUpdateManyWithWhereWithoutReceiverInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutReceiverInput>
  }

  export type MessageUpsertWithWhereUniqueWithoutSenderInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutSenderInput, MessageUncheckedUpdateWithoutSenderInput>
    create: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutSenderInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutSenderInput, MessageUncheckedUpdateWithoutSenderInput>
  }

  export type MessageUpdateManyWithWhereWithoutSenderInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutSenderInput>
  }

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[]
    OR?: MessageScalarWhereInput[]
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[]
    id?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    senderEmail?: StringFilter<"Message"> | string
    receiverEmail?: StringFilter<"Message"> | string
    conversationId?: StringFilter<"Message"> | string
    isRead?: BoolFilter<"Message"> | boolean
    createdAt?: DateTimeFilter<"Message"> | Date | string
    updatedAt?: DateTimeFilter<"Message"> | Date | string
  }

  export type MessageUpsertWithWhereUniqueWithoutReceiverInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutReceiverInput, MessageUncheckedUpdateWithoutReceiverInput>
    create: XOR<MessageCreateWithoutReceiverInput, MessageUncheckedCreateWithoutReceiverInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutReceiverInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutReceiverInput, MessageUncheckedUpdateWithoutReceiverInput>
  }

  export type MessageUpdateManyWithWhereWithoutReceiverInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutReceiverInput>
  }

  export type NotificationUpsertWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
  }

  export type NotificationUpdateManyWithWhereWithoutUserInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutUserInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    OR?: NotificationScalarWhereInput[]
    NOT?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    id?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    type?: EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType
    isRead?: BoolFilter<"Notification"> | boolean
    userId?: StringFilter<"Notification"> | string
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    updatedAt?: DateTimeFilter<"Notification"> | Date | string
  }

  export type SavedFreelancerUpsertWithWhereUniqueWithoutUserInput = {
    where: SavedFreelancerWhereUniqueInput
    update: XOR<SavedFreelancerUpdateWithoutUserInput, SavedFreelancerUncheckedUpdateWithoutUserInput>
    create: XOR<SavedFreelancerCreateWithoutUserInput, SavedFreelancerUncheckedCreateWithoutUserInput>
  }

  export type SavedFreelancerUpdateWithWhereUniqueWithoutUserInput = {
    where: SavedFreelancerWhereUniqueInput
    data: XOR<SavedFreelancerUpdateWithoutUserInput, SavedFreelancerUncheckedUpdateWithoutUserInput>
  }

  export type SavedFreelancerUpdateManyWithWhereWithoutUserInput = {
    where: SavedFreelancerScalarWhereInput
    data: XOR<SavedFreelancerUpdateManyMutationInput, SavedFreelancerUncheckedUpdateManyWithoutUserInput>
  }

  export type SavedFreelancerScalarWhereInput = {
    AND?: SavedFreelancerScalarWhereInput | SavedFreelancerScalarWhereInput[]
    OR?: SavedFreelancerScalarWhereInput[]
    NOT?: SavedFreelancerScalarWhereInput | SavedFreelancerScalarWhereInput[]
    id?: StringFilter<"SavedFreelancer"> | string
    userId?: StringFilter<"SavedFreelancer"> | string
    freelancerId?: StringFilter<"SavedFreelancer"> | string
    createdAt?: DateTimeFilter<"SavedFreelancer"> | Date | string
  }

  export type SavedFreelancerUpsertWithWhereUniqueWithoutFreelancerInput = {
    where: SavedFreelancerWhereUniqueInput
    update: XOR<SavedFreelancerUpdateWithoutFreelancerInput, SavedFreelancerUncheckedUpdateWithoutFreelancerInput>
    create: XOR<SavedFreelancerCreateWithoutFreelancerInput, SavedFreelancerUncheckedCreateWithoutFreelancerInput>
  }

  export type SavedFreelancerUpdateWithWhereUniqueWithoutFreelancerInput = {
    where: SavedFreelancerWhereUniqueInput
    data: XOR<SavedFreelancerUpdateWithoutFreelancerInput, SavedFreelancerUncheckedUpdateWithoutFreelancerInput>
  }

  export type SavedFreelancerUpdateManyWithWhereWithoutFreelancerInput = {
    where: SavedFreelancerScalarWhereInput
    data: XOR<SavedFreelancerUpdateManyMutationInput, SavedFreelancerUncheckedUpdateManyWithoutFreelancerInput>
  }

  export type ConversationCreateWithoutJobInput = {
    id?: string
    participants?: ConversationCreateparticipantsInput | string[]
    projectName?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageCreateNestedManyWithoutConversationInput
    lastMessage?: MessageCreateNestedOneWithoutConversationAsLastMessageInput
  }

  export type ConversationUncheckedCreateWithoutJobInput = {
    id?: string
    participants?: ConversationCreateparticipantsInput | string[]
    projectName?: string | null
    isActive?: boolean
    lastMessageId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationCreateOrConnectWithoutJobInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutJobInput, ConversationUncheckedCreateWithoutJobInput>
  }

  export type ConversationCreateManyJobInputEnvelope = {
    data: ConversationCreateManyJobInput | ConversationCreateManyJobInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutJobsPostedInput = {
    id?: string
    googleId?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    avatar?: string | null
    bio?: string | null
    location?: string | null
    phone?: string | null
    userType?: $Enums.UserType
    isOnboarded?: boolean
    onboardingStep?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    country?: string | null
    city?: string | null
    timezone?: string | null
    title?: string | null
    overview?: string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserCreatetopSkillsInput | string[]
    serviceOfferings?: UserCreateserviceOfferingsInput | string[]
    hourlyRate?: number | null
    portfolio?: string | null
    experience?: string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserCreatecertificationsInput | string[]
    availability?: string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: string | null
    subcategory?: string | null
    experienceLevel?: string | null
    totalEarnings?: string | null
    successRate?: number | null
    completedJobs?: number | null
    onTime?: number | null
    onBudget?: number | null
    responseTime?: string | null
    lastActive?: string | null
    topRatedPlus?: boolean
    verified?: boolean
    risingTalent?: boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserCreatespecializationsInput | string[]
    memberSince?: string | null
    profileStrength?: number | null
    repeatHireRate?: number | null
    rating?: number | null
    reviewCount?: number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: string | null
    isOnline?: boolean
    hourlyRateRange?: string | null
    availabilityStatus?: string | null
    companyName?: string | null
    companySize?: string | null
    industry?: string | null
    companyWebsite?: string | null
    companyDescription?: string | null
    projectTypes?: UserCreateprojectTypesInput | string[]
    preferredSkills?: UserCreatepreferredSkillsInput | string[]
    budgetRange?: string | null
    clientType?: string | null
    howDidYouHear?: string | null
    interestedCategories?: UserCreateinterestedCategoriesInput | string[]
    urgencyLevel?: string | null
    preferredWorkingStyle?: string | null
    communicationPreference?: UserCreatecommunicationPreferenceInput | string[]
    projectDescription?: string | null
    paymentPreference?: string | null
    projectFrequency?: string | null
    averageProjectDuration?: string | null
    maxHourlyRate?: string | null
    totalMonthlyBudget?: string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserCreateworkingDaysInput | string[]
    minimumProjectBudget?: string | null
    specialRequirements?: string | null
    idDocument?: string | null
    addressProof?: string | null
    taxInformation?: string | null
    phoneVerified?: boolean
    proposals?: ProposalCreateNestedManyWithoutFreelancerInput
    reviews?: ReviewCreateNestedManyWithoutAuthorInput
    receivedReviews?: ReviewCreateNestedManyWithoutReceiverInput
    messages?: MessageCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    savedFreelancers?: SavedFreelancerCreateNestedManyWithoutUserInput
    savedByUsers?: SavedFreelancerCreateNestedManyWithoutFreelancerInput
  }

  export type UserUncheckedCreateWithoutJobsPostedInput = {
    id?: string
    googleId?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    avatar?: string | null
    bio?: string | null
    location?: string | null
    phone?: string | null
    userType?: $Enums.UserType
    isOnboarded?: boolean
    onboardingStep?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    country?: string | null
    city?: string | null
    timezone?: string | null
    title?: string | null
    overview?: string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserCreatetopSkillsInput | string[]
    serviceOfferings?: UserCreateserviceOfferingsInput | string[]
    hourlyRate?: number | null
    portfolio?: string | null
    experience?: string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserCreatecertificationsInput | string[]
    availability?: string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: string | null
    subcategory?: string | null
    experienceLevel?: string | null
    totalEarnings?: string | null
    successRate?: number | null
    completedJobs?: number | null
    onTime?: number | null
    onBudget?: number | null
    responseTime?: string | null
    lastActive?: string | null
    topRatedPlus?: boolean
    verified?: boolean
    risingTalent?: boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserCreatespecializationsInput | string[]
    memberSince?: string | null
    profileStrength?: number | null
    repeatHireRate?: number | null
    rating?: number | null
    reviewCount?: number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: string | null
    isOnline?: boolean
    hourlyRateRange?: string | null
    availabilityStatus?: string | null
    companyName?: string | null
    companySize?: string | null
    industry?: string | null
    companyWebsite?: string | null
    companyDescription?: string | null
    projectTypes?: UserCreateprojectTypesInput | string[]
    preferredSkills?: UserCreatepreferredSkillsInput | string[]
    budgetRange?: string | null
    clientType?: string | null
    howDidYouHear?: string | null
    interestedCategories?: UserCreateinterestedCategoriesInput | string[]
    urgencyLevel?: string | null
    preferredWorkingStyle?: string | null
    communicationPreference?: UserCreatecommunicationPreferenceInput | string[]
    projectDescription?: string | null
    paymentPreference?: string | null
    projectFrequency?: string | null
    averageProjectDuration?: string | null
    maxHourlyRate?: string | null
    totalMonthlyBudget?: string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserCreateworkingDaysInput | string[]
    minimumProjectBudget?: string | null
    specialRequirements?: string | null
    idDocument?: string | null
    addressProof?: string | null
    taxInformation?: string | null
    phoneVerified?: boolean
    proposals?: ProposalUncheckedCreateNestedManyWithoutFreelancerInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutAuthorInput
    receivedReviews?: ReviewUncheckedCreateNestedManyWithoutReceiverInput
    messages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    savedFreelancers?: SavedFreelancerUncheckedCreateNestedManyWithoutUserInput
    savedByUsers?: SavedFreelancerUncheckedCreateNestedManyWithoutFreelancerInput
  }

  export type UserCreateOrConnectWithoutJobsPostedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutJobsPostedInput, UserUncheckedCreateWithoutJobsPostedInput>
  }

  export type ProposalCreateWithoutJobInput = {
    id?: string
    coverLetter: string
    bidAmount: number
    estimatedDuration: string
    attachments?: ProposalCreateattachmentsInput | string[]
    status?: $Enums.ProposalStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    questionResponses?: NullableJsonNullValueInput | InputJsonValue
    milestones?: NullableJsonNullValueInput | InputJsonValue
    clientNotes?: string | null
    clientViewed?: boolean
    rating?: number | null
    interview?: NullableJsonNullValueInput | InputJsonValue
    originalBudget?: number | null
    isShortlisted?: boolean
    freelancer: UserCreateNestedOneWithoutProposalsInput
  }

  export type ProposalUncheckedCreateWithoutJobInput = {
    id?: string
    coverLetter: string
    bidAmount: number
    estimatedDuration: string
    attachments?: ProposalCreateattachmentsInput | string[]
    status?: $Enums.ProposalStatus
    freelancerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    questionResponses?: NullableJsonNullValueInput | InputJsonValue
    milestones?: NullableJsonNullValueInput | InputJsonValue
    clientNotes?: string | null
    clientViewed?: boolean
    rating?: number | null
    interview?: NullableJsonNullValueInput | InputJsonValue
    originalBudget?: number | null
    isShortlisted?: boolean
  }

  export type ProposalCreateOrConnectWithoutJobInput = {
    where: ProposalWhereUniqueInput
    create: XOR<ProposalCreateWithoutJobInput, ProposalUncheckedCreateWithoutJobInput>
  }

  export type ProposalCreateManyJobInputEnvelope = {
    data: ProposalCreateManyJobInput | ProposalCreateManyJobInput[]
    skipDuplicates?: boolean
  }

  export type ReviewCreateWithoutJobInput = {
    id?: string
    rating: number
    comment: string
    createdAt?: Date | string
    updatedAt?: Date | string
    author: UserCreateNestedOneWithoutReviewsInput
    receiver: UserCreateNestedOneWithoutReceivedReviewsInput
  }

  export type ReviewUncheckedCreateWithoutJobInput = {
    id?: string
    rating: number
    comment: string
    authorId: string
    receiverId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewCreateOrConnectWithoutJobInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutJobInput, ReviewUncheckedCreateWithoutJobInput>
  }

  export type ReviewCreateManyJobInputEnvelope = {
    data: ReviewCreateManyJobInput | ReviewCreateManyJobInput[]
    skipDuplicates?: boolean
  }

  export type ConversationUpsertWithWhereUniqueWithoutJobInput = {
    where: ConversationWhereUniqueInput
    update: XOR<ConversationUpdateWithoutJobInput, ConversationUncheckedUpdateWithoutJobInput>
    create: XOR<ConversationCreateWithoutJobInput, ConversationUncheckedCreateWithoutJobInput>
  }

  export type ConversationUpdateWithWhereUniqueWithoutJobInput = {
    where: ConversationWhereUniqueInput
    data: XOR<ConversationUpdateWithoutJobInput, ConversationUncheckedUpdateWithoutJobInput>
  }

  export type ConversationUpdateManyWithWhereWithoutJobInput = {
    where: ConversationScalarWhereInput
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyWithoutJobInput>
  }

  export type ConversationScalarWhereInput = {
    AND?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
    OR?: ConversationScalarWhereInput[]
    NOT?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
    id?: StringFilter<"Conversation"> | string
    participants?: StringNullableListFilter<"Conversation">
    jobId?: StringNullableFilter<"Conversation"> | string | null
    projectName?: StringNullableFilter<"Conversation"> | string | null
    isActive?: BoolFilter<"Conversation"> | boolean
    lastMessageId?: StringNullableFilter<"Conversation"> | string | null
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
  }

  export type UserUpsertWithoutJobsPostedInput = {
    update: XOR<UserUpdateWithoutJobsPostedInput, UserUncheckedUpdateWithoutJobsPostedInput>
    create: XOR<UserCreateWithoutJobsPostedInput, UserUncheckedCreateWithoutJobsPostedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutJobsPostedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutJobsPostedInput, UserUncheckedUpdateWithoutJobsPostedInput>
  }

  export type UserUpdateWithoutJobsPostedInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isOnboarded?: BoolFieldUpdateOperationsInput | boolean
    onboardingStep?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    overview?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserUpdatetopSkillsInput | string[]
    serviceOfferings?: UserUpdateserviceOfferingsInput | string[]
    hourlyRate?: NullableFloatFieldUpdateOperationsInput | number | null
    portfolio?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserUpdatecertificationsInput | string[]
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalEarnings?: NullableStringFieldUpdateOperationsInput | string | null
    successRate?: NullableIntFieldUpdateOperationsInput | number | null
    completedJobs?: NullableIntFieldUpdateOperationsInput | number | null
    onTime?: NullableIntFieldUpdateOperationsInput | number | null
    onBudget?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableStringFieldUpdateOperationsInput | string | null
    lastActive?: NullableStringFieldUpdateOperationsInput | string | null
    topRatedPlus?: BoolFieldUpdateOperationsInput | boolean
    verified?: BoolFieldUpdateOperationsInput | boolean
    risingTalent?: BoolFieldUpdateOperationsInput | boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserUpdatespecializationsInput | string[]
    memberSince?: NullableStringFieldUpdateOperationsInput | string | null
    profileStrength?: NullableIntFieldUpdateOperationsInput | number | null
    repeatHireRate?: NullableIntFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    reviewCount?: NullableIntFieldUpdateOperationsInput | number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    hourlyRateRange?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityStatus?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    companyWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    companyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    projectTypes?: UserUpdateprojectTypesInput | string[]
    preferredSkills?: UserUpdatepreferredSkillsInput | string[]
    budgetRange?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: NullableStringFieldUpdateOperationsInput | string | null
    howDidYouHear?: NullableStringFieldUpdateOperationsInput | string | null
    interestedCategories?: UserUpdateinterestedCategoriesInput | string[]
    urgencyLevel?: NullableStringFieldUpdateOperationsInput | string | null
    preferredWorkingStyle?: NullableStringFieldUpdateOperationsInput | string | null
    communicationPreference?: UserUpdatecommunicationPreferenceInput | string[]
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null
    paymentPreference?: NullableStringFieldUpdateOperationsInput | string | null
    projectFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    averageProjectDuration?: NullableStringFieldUpdateOperationsInput | string | null
    maxHourlyRate?: NullableStringFieldUpdateOperationsInput | string | null
    totalMonthlyBudget?: NullableStringFieldUpdateOperationsInput | string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserUpdateworkingDaysInput | string[]
    minimumProjectBudget?: NullableStringFieldUpdateOperationsInput | string | null
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    idDocument?: NullableStringFieldUpdateOperationsInput | string | null
    addressProof?: NullableStringFieldUpdateOperationsInput | string | null
    taxInformation?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    proposals?: ProposalUpdateManyWithoutFreelancerNestedInput
    reviews?: ReviewUpdateManyWithoutAuthorNestedInput
    receivedReviews?: ReviewUpdateManyWithoutReceiverNestedInput
    messages?: MessageUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    savedFreelancers?: SavedFreelancerUpdateManyWithoutUserNestedInput
    savedByUsers?: SavedFreelancerUpdateManyWithoutFreelancerNestedInput
  }

  export type UserUncheckedUpdateWithoutJobsPostedInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isOnboarded?: BoolFieldUpdateOperationsInput | boolean
    onboardingStep?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    overview?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserUpdatetopSkillsInput | string[]
    serviceOfferings?: UserUpdateserviceOfferingsInput | string[]
    hourlyRate?: NullableFloatFieldUpdateOperationsInput | number | null
    portfolio?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserUpdatecertificationsInput | string[]
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalEarnings?: NullableStringFieldUpdateOperationsInput | string | null
    successRate?: NullableIntFieldUpdateOperationsInput | number | null
    completedJobs?: NullableIntFieldUpdateOperationsInput | number | null
    onTime?: NullableIntFieldUpdateOperationsInput | number | null
    onBudget?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableStringFieldUpdateOperationsInput | string | null
    lastActive?: NullableStringFieldUpdateOperationsInput | string | null
    topRatedPlus?: BoolFieldUpdateOperationsInput | boolean
    verified?: BoolFieldUpdateOperationsInput | boolean
    risingTalent?: BoolFieldUpdateOperationsInput | boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserUpdatespecializationsInput | string[]
    memberSince?: NullableStringFieldUpdateOperationsInput | string | null
    profileStrength?: NullableIntFieldUpdateOperationsInput | number | null
    repeatHireRate?: NullableIntFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    reviewCount?: NullableIntFieldUpdateOperationsInput | number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    hourlyRateRange?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityStatus?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    companyWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    companyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    projectTypes?: UserUpdateprojectTypesInput | string[]
    preferredSkills?: UserUpdatepreferredSkillsInput | string[]
    budgetRange?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: NullableStringFieldUpdateOperationsInput | string | null
    howDidYouHear?: NullableStringFieldUpdateOperationsInput | string | null
    interestedCategories?: UserUpdateinterestedCategoriesInput | string[]
    urgencyLevel?: NullableStringFieldUpdateOperationsInput | string | null
    preferredWorkingStyle?: NullableStringFieldUpdateOperationsInput | string | null
    communicationPreference?: UserUpdatecommunicationPreferenceInput | string[]
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null
    paymentPreference?: NullableStringFieldUpdateOperationsInput | string | null
    projectFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    averageProjectDuration?: NullableStringFieldUpdateOperationsInput | string | null
    maxHourlyRate?: NullableStringFieldUpdateOperationsInput | string | null
    totalMonthlyBudget?: NullableStringFieldUpdateOperationsInput | string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserUpdateworkingDaysInput | string[]
    minimumProjectBudget?: NullableStringFieldUpdateOperationsInput | string | null
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    idDocument?: NullableStringFieldUpdateOperationsInput | string | null
    addressProof?: NullableStringFieldUpdateOperationsInput | string | null
    taxInformation?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    proposals?: ProposalUncheckedUpdateManyWithoutFreelancerNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutAuthorNestedInput
    receivedReviews?: ReviewUncheckedUpdateManyWithoutReceiverNestedInput
    messages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    savedFreelancers?: SavedFreelancerUncheckedUpdateManyWithoutUserNestedInput
    savedByUsers?: SavedFreelancerUncheckedUpdateManyWithoutFreelancerNestedInput
  }

  export type ProposalUpsertWithWhereUniqueWithoutJobInput = {
    where: ProposalWhereUniqueInput
    update: XOR<ProposalUpdateWithoutJobInput, ProposalUncheckedUpdateWithoutJobInput>
    create: XOR<ProposalCreateWithoutJobInput, ProposalUncheckedCreateWithoutJobInput>
  }

  export type ProposalUpdateWithWhereUniqueWithoutJobInput = {
    where: ProposalWhereUniqueInput
    data: XOR<ProposalUpdateWithoutJobInput, ProposalUncheckedUpdateWithoutJobInput>
  }

  export type ProposalUpdateManyWithWhereWithoutJobInput = {
    where: ProposalScalarWhereInput
    data: XOR<ProposalUpdateManyMutationInput, ProposalUncheckedUpdateManyWithoutJobInput>
  }

  export type ReviewUpsertWithWhereUniqueWithoutJobInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutJobInput, ReviewUncheckedUpdateWithoutJobInput>
    create: XOR<ReviewCreateWithoutJobInput, ReviewUncheckedCreateWithoutJobInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutJobInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutJobInput, ReviewUncheckedUpdateWithoutJobInput>
  }

  export type ReviewUpdateManyWithWhereWithoutJobInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutJobInput>
  }

  export type JobCreateWithoutProposalsInput = {
    id?: string
    title: string
    description: string
    requirements?: JobCreaterequirementsInput | string[]
    budget: $Enums.BudgetType
    minBudget?: number | null
    maxBudget?: number | null
    hourlyRate?: number | null
    duration?: string | null
    skills?: JobCreateskillsInput | string[]
    category: string
    subcategory?: string | null
    projectType?: string | null
    experienceLevel?: string | null
    workingHours?: string | null
    timezone?: string | null
    communicationPreferences?: JobCreatecommunicationPreferencesInput | string[]
    location?: string | null
    isRemote?: boolean
    status?: $Enums.JobStatus
    isUrgent?: boolean
    visibility?: string
    applicationDeadline?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    conversation?: ConversationCreateNestedManyWithoutJobInput
    client: UserCreateNestedOneWithoutJobsPostedInput
    reviews?: ReviewCreateNestedManyWithoutJobInput
  }

  export type JobUncheckedCreateWithoutProposalsInput = {
    id?: string
    title: string
    description: string
    requirements?: JobCreaterequirementsInput | string[]
    budget: $Enums.BudgetType
    minBudget?: number | null
    maxBudget?: number | null
    hourlyRate?: number | null
    duration?: string | null
    skills?: JobCreateskillsInput | string[]
    category: string
    subcategory?: string | null
    projectType?: string | null
    experienceLevel?: string | null
    workingHours?: string | null
    timezone?: string | null
    communicationPreferences?: JobCreatecommunicationPreferencesInput | string[]
    location?: string | null
    isRemote?: boolean
    status?: $Enums.JobStatus
    isUrgent?: boolean
    visibility?: string
    applicationDeadline?: Date | string | null
    clientId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    conversation?: ConversationUncheckedCreateNestedManyWithoutJobInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutJobInput
  }

  export type JobCreateOrConnectWithoutProposalsInput = {
    where: JobWhereUniqueInput
    create: XOR<JobCreateWithoutProposalsInput, JobUncheckedCreateWithoutProposalsInput>
  }

  export type UserCreateWithoutProposalsInput = {
    id?: string
    googleId?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    avatar?: string | null
    bio?: string | null
    location?: string | null
    phone?: string | null
    userType?: $Enums.UserType
    isOnboarded?: boolean
    onboardingStep?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    country?: string | null
    city?: string | null
    timezone?: string | null
    title?: string | null
    overview?: string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserCreatetopSkillsInput | string[]
    serviceOfferings?: UserCreateserviceOfferingsInput | string[]
    hourlyRate?: number | null
    portfolio?: string | null
    experience?: string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserCreatecertificationsInput | string[]
    availability?: string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: string | null
    subcategory?: string | null
    experienceLevel?: string | null
    totalEarnings?: string | null
    successRate?: number | null
    completedJobs?: number | null
    onTime?: number | null
    onBudget?: number | null
    responseTime?: string | null
    lastActive?: string | null
    topRatedPlus?: boolean
    verified?: boolean
    risingTalent?: boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserCreatespecializationsInput | string[]
    memberSince?: string | null
    profileStrength?: number | null
    repeatHireRate?: number | null
    rating?: number | null
    reviewCount?: number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: string | null
    isOnline?: boolean
    hourlyRateRange?: string | null
    availabilityStatus?: string | null
    companyName?: string | null
    companySize?: string | null
    industry?: string | null
    companyWebsite?: string | null
    companyDescription?: string | null
    projectTypes?: UserCreateprojectTypesInput | string[]
    preferredSkills?: UserCreatepreferredSkillsInput | string[]
    budgetRange?: string | null
    clientType?: string | null
    howDidYouHear?: string | null
    interestedCategories?: UserCreateinterestedCategoriesInput | string[]
    urgencyLevel?: string | null
    preferredWorkingStyle?: string | null
    communicationPreference?: UserCreatecommunicationPreferenceInput | string[]
    projectDescription?: string | null
    paymentPreference?: string | null
    projectFrequency?: string | null
    averageProjectDuration?: string | null
    maxHourlyRate?: string | null
    totalMonthlyBudget?: string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserCreateworkingDaysInput | string[]
    minimumProjectBudget?: string | null
    specialRequirements?: string | null
    idDocument?: string | null
    addressProof?: string | null
    taxInformation?: string | null
    phoneVerified?: boolean
    jobsPosted?: JobCreateNestedManyWithoutClientInput
    reviews?: ReviewCreateNestedManyWithoutAuthorInput
    receivedReviews?: ReviewCreateNestedManyWithoutReceiverInput
    messages?: MessageCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    savedFreelancers?: SavedFreelancerCreateNestedManyWithoutUserInput
    savedByUsers?: SavedFreelancerCreateNestedManyWithoutFreelancerInput
  }

  export type UserUncheckedCreateWithoutProposalsInput = {
    id?: string
    googleId?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    avatar?: string | null
    bio?: string | null
    location?: string | null
    phone?: string | null
    userType?: $Enums.UserType
    isOnboarded?: boolean
    onboardingStep?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    country?: string | null
    city?: string | null
    timezone?: string | null
    title?: string | null
    overview?: string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserCreatetopSkillsInput | string[]
    serviceOfferings?: UserCreateserviceOfferingsInput | string[]
    hourlyRate?: number | null
    portfolio?: string | null
    experience?: string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserCreatecertificationsInput | string[]
    availability?: string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: string | null
    subcategory?: string | null
    experienceLevel?: string | null
    totalEarnings?: string | null
    successRate?: number | null
    completedJobs?: number | null
    onTime?: number | null
    onBudget?: number | null
    responseTime?: string | null
    lastActive?: string | null
    topRatedPlus?: boolean
    verified?: boolean
    risingTalent?: boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserCreatespecializationsInput | string[]
    memberSince?: string | null
    profileStrength?: number | null
    repeatHireRate?: number | null
    rating?: number | null
    reviewCount?: number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: string | null
    isOnline?: boolean
    hourlyRateRange?: string | null
    availabilityStatus?: string | null
    companyName?: string | null
    companySize?: string | null
    industry?: string | null
    companyWebsite?: string | null
    companyDescription?: string | null
    projectTypes?: UserCreateprojectTypesInput | string[]
    preferredSkills?: UserCreatepreferredSkillsInput | string[]
    budgetRange?: string | null
    clientType?: string | null
    howDidYouHear?: string | null
    interestedCategories?: UserCreateinterestedCategoriesInput | string[]
    urgencyLevel?: string | null
    preferredWorkingStyle?: string | null
    communicationPreference?: UserCreatecommunicationPreferenceInput | string[]
    projectDescription?: string | null
    paymentPreference?: string | null
    projectFrequency?: string | null
    averageProjectDuration?: string | null
    maxHourlyRate?: string | null
    totalMonthlyBudget?: string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserCreateworkingDaysInput | string[]
    minimumProjectBudget?: string | null
    specialRequirements?: string | null
    idDocument?: string | null
    addressProof?: string | null
    taxInformation?: string | null
    phoneVerified?: boolean
    jobsPosted?: JobUncheckedCreateNestedManyWithoutClientInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutAuthorInput
    receivedReviews?: ReviewUncheckedCreateNestedManyWithoutReceiverInput
    messages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    savedFreelancers?: SavedFreelancerUncheckedCreateNestedManyWithoutUserInput
    savedByUsers?: SavedFreelancerUncheckedCreateNestedManyWithoutFreelancerInput
  }

  export type UserCreateOrConnectWithoutProposalsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProposalsInput, UserUncheckedCreateWithoutProposalsInput>
  }

  export type JobUpsertWithoutProposalsInput = {
    update: XOR<JobUpdateWithoutProposalsInput, JobUncheckedUpdateWithoutProposalsInput>
    create: XOR<JobCreateWithoutProposalsInput, JobUncheckedCreateWithoutProposalsInput>
    where?: JobWhereInput
  }

  export type JobUpdateToOneWithWhereWithoutProposalsInput = {
    where?: JobWhereInput
    data: XOR<JobUpdateWithoutProposalsInput, JobUncheckedUpdateWithoutProposalsInput>
  }

  export type JobUpdateWithoutProposalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    requirements?: JobUpdaterequirementsInput | string[]
    budget?: EnumBudgetTypeFieldUpdateOperationsInput | $Enums.BudgetType
    minBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    maxBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    hourlyRate?: NullableFloatFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: JobUpdateskillsInput | string[]
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    projectType?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    communicationPreferences?: JobUpdatecommunicationPreferencesInput | string[]
    location?: NullableStringFieldUpdateOperationsInput | string | null
    isRemote?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    isUrgent?: BoolFieldUpdateOperationsInput | boolean
    visibility?: StringFieldUpdateOperationsInput | string
    applicationDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation?: ConversationUpdateManyWithoutJobNestedInput
    client?: UserUpdateOneRequiredWithoutJobsPostedNestedInput
    reviews?: ReviewUpdateManyWithoutJobNestedInput
  }

  export type JobUncheckedUpdateWithoutProposalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    requirements?: JobUpdaterequirementsInput | string[]
    budget?: EnumBudgetTypeFieldUpdateOperationsInput | $Enums.BudgetType
    minBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    maxBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    hourlyRate?: NullableFloatFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: JobUpdateskillsInput | string[]
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    projectType?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    communicationPreferences?: JobUpdatecommunicationPreferencesInput | string[]
    location?: NullableStringFieldUpdateOperationsInput | string | null
    isRemote?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    isUrgent?: BoolFieldUpdateOperationsInput | boolean
    visibility?: StringFieldUpdateOperationsInput | string
    applicationDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clientId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation?: ConversationUncheckedUpdateManyWithoutJobNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutJobNestedInput
  }

  export type UserUpsertWithoutProposalsInput = {
    update: XOR<UserUpdateWithoutProposalsInput, UserUncheckedUpdateWithoutProposalsInput>
    create: XOR<UserCreateWithoutProposalsInput, UserUncheckedCreateWithoutProposalsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProposalsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProposalsInput, UserUncheckedUpdateWithoutProposalsInput>
  }

  export type UserUpdateWithoutProposalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isOnboarded?: BoolFieldUpdateOperationsInput | boolean
    onboardingStep?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    overview?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserUpdatetopSkillsInput | string[]
    serviceOfferings?: UserUpdateserviceOfferingsInput | string[]
    hourlyRate?: NullableFloatFieldUpdateOperationsInput | number | null
    portfolio?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserUpdatecertificationsInput | string[]
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalEarnings?: NullableStringFieldUpdateOperationsInput | string | null
    successRate?: NullableIntFieldUpdateOperationsInput | number | null
    completedJobs?: NullableIntFieldUpdateOperationsInput | number | null
    onTime?: NullableIntFieldUpdateOperationsInput | number | null
    onBudget?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableStringFieldUpdateOperationsInput | string | null
    lastActive?: NullableStringFieldUpdateOperationsInput | string | null
    topRatedPlus?: BoolFieldUpdateOperationsInput | boolean
    verified?: BoolFieldUpdateOperationsInput | boolean
    risingTalent?: BoolFieldUpdateOperationsInput | boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserUpdatespecializationsInput | string[]
    memberSince?: NullableStringFieldUpdateOperationsInput | string | null
    profileStrength?: NullableIntFieldUpdateOperationsInput | number | null
    repeatHireRate?: NullableIntFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    reviewCount?: NullableIntFieldUpdateOperationsInput | number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    hourlyRateRange?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityStatus?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    companyWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    companyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    projectTypes?: UserUpdateprojectTypesInput | string[]
    preferredSkills?: UserUpdatepreferredSkillsInput | string[]
    budgetRange?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: NullableStringFieldUpdateOperationsInput | string | null
    howDidYouHear?: NullableStringFieldUpdateOperationsInput | string | null
    interestedCategories?: UserUpdateinterestedCategoriesInput | string[]
    urgencyLevel?: NullableStringFieldUpdateOperationsInput | string | null
    preferredWorkingStyle?: NullableStringFieldUpdateOperationsInput | string | null
    communicationPreference?: UserUpdatecommunicationPreferenceInput | string[]
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null
    paymentPreference?: NullableStringFieldUpdateOperationsInput | string | null
    projectFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    averageProjectDuration?: NullableStringFieldUpdateOperationsInput | string | null
    maxHourlyRate?: NullableStringFieldUpdateOperationsInput | string | null
    totalMonthlyBudget?: NullableStringFieldUpdateOperationsInput | string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserUpdateworkingDaysInput | string[]
    minimumProjectBudget?: NullableStringFieldUpdateOperationsInput | string | null
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    idDocument?: NullableStringFieldUpdateOperationsInput | string | null
    addressProof?: NullableStringFieldUpdateOperationsInput | string | null
    taxInformation?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    jobsPosted?: JobUpdateManyWithoutClientNestedInput
    reviews?: ReviewUpdateManyWithoutAuthorNestedInput
    receivedReviews?: ReviewUpdateManyWithoutReceiverNestedInput
    messages?: MessageUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    savedFreelancers?: SavedFreelancerUpdateManyWithoutUserNestedInput
    savedByUsers?: SavedFreelancerUpdateManyWithoutFreelancerNestedInput
  }

  export type UserUncheckedUpdateWithoutProposalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isOnboarded?: BoolFieldUpdateOperationsInput | boolean
    onboardingStep?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    overview?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserUpdatetopSkillsInput | string[]
    serviceOfferings?: UserUpdateserviceOfferingsInput | string[]
    hourlyRate?: NullableFloatFieldUpdateOperationsInput | number | null
    portfolio?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserUpdatecertificationsInput | string[]
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalEarnings?: NullableStringFieldUpdateOperationsInput | string | null
    successRate?: NullableIntFieldUpdateOperationsInput | number | null
    completedJobs?: NullableIntFieldUpdateOperationsInput | number | null
    onTime?: NullableIntFieldUpdateOperationsInput | number | null
    onBudget?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableStringFieldUpdateOperationsInput | string | null
    lastActive?: NullableStringFieldUpdateOperationsInput | string | null
    topRatedPlus?: BoolFieldUpdateOperationsInput | boolean
    verified?: BoolFieldUpdateOperationsInput | boolean
    risingTalent?: BoolFieldUpdateOperationsInput | boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserUpdatespecializationsInput | string[]
    memberSince?: NullableStringFieldUpdateOperationsInput | string | null
    profileStrength?: NullableIntFieldUpdateOperationsInput | number | null
    repeatHireRate?: NullableIntFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    reviewCount?: NullableIntFieldUpdateOperationsInput | number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    hourlyRateRange?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityStatus?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    companyWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    companyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    projectTypes?: UserUpdateprojectTypesInput | string[]
    preferredSkills?: UserUpdatepreferredSkillsInput | string[]
    budgetRange?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: NullableStringFieldUpdateOperationsInput | string | null
    howDidYouHear?: NullableStringFieldUpdateOperationsInput | string | null
    interestedCategories?: UserUpdateinterestedCategoriesInput | string[]
    urgencyLevel?: NullableStringFieldUpdateOperationsInput | string | null
    preferredWorkingStyle?: NullableStringFieldUpdateOperationsInput | string | null
    communicationPreference?: UserUpdatecommunicationPreferenceInput | string[]
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null
    paymentPreference?: NullableStringFieldUpdateOperationsInput | string | null
    projectFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    averageProjectDuration?: NullableStringFieldUpdateOperationsInput | string | null
    maxHourlyRate?: NullableStringFieldUpdateOperationsInput | string | null
    totalMonthlyBudget?: NullableStringFieldUpdateOperationsInput | string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserUpdateworkingDaysInput | string[]
    minimumProjectBudget?: NullableStringFieldUpdateOperationsInput | string | null
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    idDocument?: NullableStringFieldUpdateOperationsInput | string | null
    addressProof?: NullableStringFieldUpdateOperationsInput | string | null
    taxInformation?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    jobsPosted?: JobUncheckedUpdateManyWithoutClientNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutAuthorNestedInput
    receivedReviews?: ReviewUncheckedUpdateManyWithoutReceiverNestedInput
    messages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    savedFreelancers?: SavedFreelancerUncheckedUpdateManyWithoutUserNestedInput
    savedByUsers?: SavedFreelancerUncheckedUpdateManyWithoutFreelancerNestedInput
  }

  export type UserCreateWithoutReviewsInput = {
    id?: string
    googleId?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    avatar?: string | null
    bio?: string | null
    location?: string | null
    phone?: string | null
    userType?: $Enums.UserType
    isOnboarded?: boolean
    onboardingStep?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    country?: string | null
    city?: string | null
    timezone?: string | null
    title?: string | null
    overview?: string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserCreatetopSkillsInput | string[]
    serviceOfferings?: UserCreateserviceOfferingsInput | string[]
    hourlyRate?: number | null
    portfolio?: string | null
    experience?: string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserCreatecertificationsInput | string[]
    availability?: string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: string | null
    subcategory?: string | null
    experienceLevel?: string | null
    totalEarnings?: string | null
    successRate?: number | null
    completedJobs?: number | null
    onTime?: number | null
    onBudget?: number | null
    responseTime?: string | null
    lastActive?: string | null
    topRatedPlus?: boolean
    verified?: boolean
    risingTalent?: boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserCreatespecializationsInput | string[]
    memberSince?: string | null
    profileStrength?: number | null
    repeatHireRate?: number | null
    rating?: number | null
    reviewCount?: number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: string | null
    isOnline?: boolean
    hourlyRateRange?: string | null
    availabilityStatus?: string | null
    companyName?: string | null
    companySize?: string | null
    industry?: string | null
    companyWebsite?: string | null
    companyDescription?: string | null
    projectTypes?: UserCreateprojectTypesInput | string[]
    preferredSkills?: UserCreatepreferredSkillsInput | string[]
    budgetRange?: string | null
    clientType?: string | null
    howDidYouHear?: string | null
    interestedCategories?: UserCreateinterestedCategoriesInput | string[]
    urgencyLevel?: string | null
    preferredWorkingStyle?: string | null
    communicationPreference?: UserCreatecommunicationPreferenceInput | string[]
    projectDescription?: string | null
    paymentPreference?: string | null
    projectFrequency?: string | null
    averageProjectDuration?: string | null
    maxHourlyRate?: string | null
    totalMonthlyBudget?: string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserCreateworkingDaysInput | string[]
    minimumProjectBudget?: string | null
    specialRequirements?: string | null
    idDocument?: string | null
    addressProof?: string | null
    taxInformation?: string | null
    phoneVerified?: boolean
    jobsPosted?: JobCreateNestedManyWithoutClientInput
    proposals?: ProposalCreateNestedManyWithoutFreelancerInput
    receivedReviews?: ReviewCreateNestedManyWithoutReceiverInput
    messages?: MessageCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    savedFreelancers?: SavedFreelancerCreateNestedManyWithoutUserInput
    savedByUsers?: SavedFreelancerCreateNestedManyWithoutFreelancerInput
  }

  export type UserUncheckedCreateWithoutReviewsInput = {
    id?: string
    googleId?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    avatar?: string | null
    bio?: string | null
    location?: string | null
    phone?: string | null
    userType?: $Enums.UserType
    isOnboarded?: boolean
    onboardingStep?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    country?: string | null
    city?: string | null
    timezone?: string | null
    title?: string | null
    overview?: string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserCreatetopSkillsInput | string[]
    serviceOfferings?: UserCreateserviceOfferingsInput | string[]
    hourlyRate?: number | null
    portfolio?: string | null
    experience?: string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserCreatecertificationsInput | string[]
    availability?: string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: string | null
    subcategory?: string | null
    experienceLevel?: string | null
    totalEarnings?: string | null
    successRate?: number | null
    completedJobs?: number | null
    onTime?: number | null
    onBudget?: number | null
    responseTime?: string | null
    lastActive?: string | null
    topRatedPlus?: boolean
    verified?: boolean
    risingTalent?: boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserCreatespecializationsInput | string[]
    memberSince?: string | null
    profileStrength?: number | null
    repeatHireRate?: number | null
    rating?: number | null
    reviewCount?: number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: string | null
    isOnline?: boolean
    hourlyRateRange?: string | null
    availabilityStatus?: string | null
    companyName?: string | null
    companySize?: string | null
    industry?: string | null
    companyWebsite?: string | null
    companyDescription?: string | null
    projectTypes?: UserCreateprojectTypesInput | string[]
    preferredSkills?: UserCreatepreferredSkillsInput | string[]
    budgetRange?: string | null
    clientType?: string | null
    howDidYouHear?: string | null
    interestedCategories?: UserCreateinterestedCategoriesInput | string[]
    urgencyLevel?: string | null
    preferredWorkingStyle?: string | null
    communicationPreference?: UserCreatecommunicationPreferenceInput | string[]
    projectDescription?: string | null
    paymentPreference?: string | null
    projectFrequency?: string | null
    averageProjectDuration?: string | null
    maxHourlyRate?: string | null
    totalMonthlyBudget?: string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserCreateworkingDaysInput | string[]
    minimumProjectBudget?: string | null
    specialRequirements?: string | null
    idDocument?: string | null
    addressProof?: string | null
    taxInformation?: string | null
    phoneVerified?: boolean
    jobsPosted?: JobUncheckedCreateNestedManyWithoutClientInput
    proposals?: ProposalUncheckedCreateNestedManyWithoutFreelancerInput
    receivedReviews?: ReviewUncheckedCreateNestedManyWithoutReceiverInput
    messages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    savedFreelancers?: SavedFreelancerUncheckedCreateNestedManyWithoutUserInput
    savedByUsers?: SavedFreelancerUncheckedCreateNestedManyWithoutFreelancerInput
  }

  export type UserCreateOrConnectWithoutReviewsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
  }

  export type UserCreateWithoutReceivedReviewsInput = {
    id?: string
    googleId?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    avatar?: string | null
    bio?: string | null
    location?: string | null
    phone?: string | null
    userType?: $Enums.UserType
    isOnboarded?: boolean
    onboardingStep?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    country?: string | null
    city?: string | null
    timezone?: string | null
    title?: string | null
    overview?: string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserCreatetopSkillsInput | string[]
    serviceOfferings?: UserCreateserviceOfferingsInput | string[]
    hourlyRate?: number | null
    portfolio?: string | null
    experience?: string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserCreatecertificationsInput | string[]
    availability?: string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: string | null
    subcategory?: string | null
    experienceLevel?: string | null
    totalEarnings?: string | null
    successRate?: number | null
    completedJobs?: number | null
    onTime?: number | null
    onBudget?: number | null
    responseTime?: string | null
    lastActive?: string | null
    topRatedPlus?: boolean
    verified?: boolean
    risingTalent?: boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserCreatespecializationsInput | string[]
    memberSince?: string | null
    profileStrength?: number | null
    repeatHireRate?: number | null
    rating?: number | null
    reviewCount?: number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: string | null
    isOnline?: boolean
    hourlyRateRange?: string | null
    availabilityStatus?: string | null
    companyName?: string | null
    companySize?: string | null
    industry?: string | null
    companyWebsite?: string | null
    companyDescription?: string | null
    projectTypes?: UserCreateprojectTypesInput | string[]
    preferredSkills?: UserCreatepreferredSkillsInput | string[]
    budgetRange?: string | null
    clientType?: string | null
    howDidYouHear?: string | null
    interestedCategories?: UserCreateinterestedCategoriesInput | string[]
    urgencyLevel?: string | null
    preferredWorkingStyle?: string | null
    communicationPreference?: UserCreatecommunicationPreferenceInput | string[]
    projectDescription?: string | null
    paymentPreference?: string | null
    projectFrequency?: string | null
    averageProjectDuration?: string | null
    maxHourlyRate?: string | null
    totalMonthlyBudget?: string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserCreateworkingDaysInput | string[]
    minimumProjectBudget?: string | null
    specialRequirements?: string | null
    idDocument?: string | null
    addressProof?: string | null
    taxInformation?: string | null
    phoneVerified?: boolean
    jobsPosted?: JobCreateNestedManyWithoutClientInput
    proposals?: ProposalCreateNestedManyWithoutFreelancerInput
    reviews?: ReviewCreateNestedManyWithoutAuthorInput
    messages?: MessageCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    savedFreelancers?: SavedFreelancerCreateNestedManyWithoutUserInput
    savedByUsers?: SavedFreelancerCreateNestedManyWithoutFreelancerInput
  }

  export type UserUncheckedCreateWithoutReceivedReviewsInput = {
    id?: string
    googleId?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    avatar?: string | null
    bio?: string | null
    location?: string | null
    phone?: string | null
    userType?: $Enums.UserType
    isOnboarded?: boolean
    onboardingStep?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    country?: string | null
    city?: string | null
    timezone?: string | null
    title?: string | null
    overview?: string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserCreatetopSkillsInput | string[]
    serviceOfferings?: UserCreateserviceOfferingsInput | string[]
    hourlyRate?: number | null
    portfolio?: string | null
    experience?: string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserCreatecertificationsInput | string[]
    availability?: string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: string | null
    subcategory?: string | null
    experienceLevel?: string | null
    totalEarnings?: string | null
    successRate?: number | null
    completedJobs?: number | null
    onTime?: number | null
    onBudget?: number | null
    responseTime?: string | null
    lastActive?: string | null
    topRatedPlus?: boolean
    verified?: boolean
    risingTalent?: boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserCreatespecializationsInput | string[]
    memberSince?: string | null
    profileStrength?: number | null
    repeatHireRate?: number | null
    rating?: number | null
    reviewCount?: number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: string | null
    isOnline?: boolean
    hourlyRateRange?: string | null
    availabilityStatus?: string | null
    companyName?: string | null
    companySize?: string | null
    industry?: string | null
    companyWebsite?: string | null
    companyDescription?: string | null
    projectTypes?: UserCreateprojectTypesInput | string[]
    preferredSkills?: UserCreatepreferredSkillsInput | string[]
    budgetRange?: string | null
    clientType?: string | null
    howDidYouHear?: string | null
    interestedCategories?: UserCreateinterestedCategoriesInput | string[]
    urgencyLevel?: string | null
    preferredWorkingStyle?: string | null
    communicationPreference?: UserCreatecommunicationPreferenceInput | string[]
    projectDescription?: string | null
    paymentPreference?: string | null
    projectFrequency?: string | null
    averageProjectDuration?: string | null
    maxHourlyRate?: string | null
    totalMonthlyBudget?: string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserCreateworkingDaysInput | string[]
    minimumProjectBudget?: string | null
    specialRequirements?: string | null
    idDocument?: string | null
    addressProof?: string | null
    taxInformation?: string | null
    phoneVerified?: boolean
    jobsPosted?: JobUncheckedCreateNestedManyWithoutClientInput
    proposals?: ProposalUncheckedCreateNestedManyWithoutFreelancerInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutAuthorInput
    messages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    savedFreelancers?: SavedFreelancerUncheckedCreateNestedManyWithoutUserInput
    savedByUsers?: SavedFreelancerUncheckedCreateNestedManyWithoutFreelancerInput
  }

  export type UserCreateOrConnectWithoutReceivedReviewsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReceivedReviewsInput, UserUncheckedCreateWithoutReceivedReviewsInput>
  }

  export type JobCreateWithoutReviewsInput = {
    id?: string
    title: string
    description: string
    requirements?: JobCreaterequirementsInput | string[]
    budget: $Enums.BudgetType
    minBudget?: number | null
    maxBudget?: number | null
    hourlyRate?: number | null
    duration?: string | null
    skills?: JobCreateskillsInput | string[]
    category: string
    subcategory?: string | null
    projectType?: string | null
    experienceLevel?: string | null
    workingHours?: string | null
    timezone?: string | null
    communicationPreferences?: JobCreatecommunicationPreferencesInput | string[]
    location?: string | null
    isRemote?: boolean
    status?: $Enums.JobStatus
    isUrgent?: boolean
    visibility?: string
    applicationDeadline?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    conversation?: ConversationCreateNestedManyWithoutJobInput
    client: UserCreateNestedOneWithoutJobsPostedInput
    proposals?: ProposalCreateNestedManyWithoutJobInput
  }

  export type JobUncheckedCreateWithoutReviewsInput = {
    id?: string
    title: string
    description: string
    requirements?: JobCreaterequirementsInput | string[]
    budget: $Enums.BudgetType
    minBudget?: number | null
    maxBudget?: number | null
    hourlyRate?: number | null
    duration?: string | null
    skills?: JobCreateskillsInput | string[]
    category: string
    subcategory?: string | null
    projectType?: string | null
    experienceLevel?: string | null
    workingHours?: string | null
    timezone?: string | null
    communicationPreferences?: JobCreatecommunicationPreferencesInput | string[]
    location?: string | null
    isRemote?: boolean
    status?: $Enums.JobStatus
    isUrgent?: boolean
    visibility?: string
    applicationDeadline?: Date | string | null
    clientId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    conversation?: ConversationUncheckedCreateNestedManyWithoutJobInput
    proposals?: ProposalUncheckedCreateNestedManyWithoutJobInput
  }

  export type JobCreateOrConnectWithoutReviewsInput = {
    where: JobWhereUniqueInput
    create: XOR<JobCreateWithoutReviewsInput, JobUncheckedCreateWithoutReviewsInput>
  }

  export type UserUpsertWithoutReviewsInput = {
    update: XOR<UserUpdateWithoutReviewsInput, UserUncheckedUpdateWithoutReviewsInput>
    create: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReviewsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReviewsInput, UserUncheckedUpdateWithoutReviewsInput>
  }

  export type UserUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isOnboarded?: BoolFieldUpdateOperationsInput | boolean
    onboardingStep?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    overview?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserUpdatetopSkillsInput | string[]
    serviceOfferings?: UserUpdateserviceOfferingsInput | string[]
    hourlyRate?: NullableFloatFieldUpdateOperationsInput | number | null
    portfolio?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserUpdatecertificationsInput | string[]
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalEarnings?: NullableStringFieldUpdateOperationsInput | string | null
    successRate?: NullableIntFieldUpdateOperationsInput | number | null
    completedJobs?: NullableIntFieldUpdateOperationsInput | number | null
    onTime?: NullableIntFieldUpdateOperationsInput | number | null
    onBudget?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableStringFieldUpdateOperationsInput | string | null
    lastActive?: NullableStringFieldUpdateOperationsInput | string | null
    topRatedPlus?: BoolFieldUpdateOperationsInput | boolean
    verified?: BoolFieldUpdateOperationsInput | boolean
    risingTalent?: BoolFieldUpdateOperationsInput | boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserUpdatespecializationsInput | string[]
    memberSince?: NullableStringFieldUpdateOperationsInput | string | null
    profileStrength?: NullableIntFieldUpdateOperationsInput | number | null
    repeatHireRate?: NullableIntFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    reviewCount?: NullableIntFieldUpdateOperationsInput | number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    hourlyRateRange?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityStatus?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    companyWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    companyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    projectTypes?: UserUpdateprojectTypesInput | string[]
    preferredSkills?: UserUpdatepreferredSkillsInput | string[]
    budgetRange?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: NullableStringFieldUpdateOperationsInput | string | null
    howDidYouHear?: NullableStringFieldUpdateOperationsInput | string | null
    interestedCategories?: UserUpdateinterestedCategoriesInput | string[]
    urgencyLevel?: NullableStringFieldUpdateOperationsInput | string | null
    preferredWorkingStyle?: NullableStringFieldUpdateOperationsInput | string | null
    communicationPreference?: UserUpdatecommunicationPreferenceInput | string[]
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null
    paymentPreference?: NullableStringFieldUpdateOperationsInput | string | null
    projectFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    averageProjectDuration?: NullableStringFieldUpdateOperationsInput | string | null
    maxHourlyRate?: NullableStringFieldUpdateOperationsInput | string | null
    totalMonthlyBudget?: NullableStringFieldUpdateOperationsInput | string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserUpdateworkingDaysInput | string[]
    minimumProjectBudget?: NullableStringFieldUpdateOperationsInput | string | null
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    idDocument?: NullableStringFieldUpdateOperationsInput | string | null
    addressProof?: NullableStringFieldUpdateOperationsInput | string | null
    taxInformation?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    jobsPosted?: JobUpdateManyWithoutClientNestedInput
    proposals?: ProposalUpdateManyWithoutFreelancerNestedInput
    receivedReviews?: ReviewUpdateManyWithoutReceiverNestedInput
    messages?: MessageUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    savedFreelancers?: SavedFreelancerUpdateManyWithoutUserNestedInput
    savedByUsers?: SavedFreelancerUpdateManyWithoutFreelancerNestedInput
  }

  export type UserUncheckedUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isOnboarded?: BoolFieldUpdateOperationsInput | boolean
    onboardingStep?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    overview?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserUpdatetopSkillsInput | string[]
    serviceOfferings?: UserUpdateserviceOfferingsInput | string[]
    hourlyRate?: NullableFloatFieldUpdateOperationsInput | number | null
    portfolio?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserUpdatecertificationsInput | string[]
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalEarnings?: NullableStringFieldUpdateOperationsInput | string | null
    successRate?: NullableIntFieldUpdateOperationsInput | number | null
    completedJobs?: NullableIntFieldUpdateOperationsInput | number | null
    onTime?: NullableIntFieldUpdateOperationsInput | number | null
    onBudget?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableStringFieldUpdateOperationsInput | string | null
    lastActive?: NullableStringFieldUpdateOperationsInput | string | null
    topRatedPlus?: BoolFieldUpdateOperationsInput | boolean
    verified?: BoolFieldUpdateOperationsInput | boolean
    risingTalent?: BoolFieldUpdateOperationsInput | boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserUpdatespecializationsInput | string[]
    memberSince?: NullableStringFieldUpdateOperationsInput | string | null
    profileStrength?: NullableIntFieldUpdateOperationsInput | number | null
    repeatHireRate?: NullableIntFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    reviewCount?: NullableIntFieldUpdateOperationsInput | number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    hourlyRateRange?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityStatus?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    companyWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    companyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    projectTypes?: UserUpdateprojectTypesInput | string[]
    preferredSkills?: UserUpdatepreferredSkillsInput | string[]
    budgetRange?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: NullableStringFieldUpdateOperationsInput | string | null
    howDidYouHear?: NullableStringFieldUpdateOperationsInput | string | null
    interestedCategories?: UserUpdateinterestedCategoriesInput | string[]
    urgencyLevel?: NullableStringFieldUpdateOperationsInput | string | null
    preferredWorkingStyle?: NullableStringFieldUpdateOperationsInput | string | null
    communicationPreference?: UserUpdatecommunicationPreferenceInput | string[]
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null
    paymentPreference?: NullableStringFieldUpdateOperationsInput | string | null
    projectFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    averageProjectDuration?: NullableStringFieldUpdateOperationsInput | string | null
    maxHourlyRate?: NullableStringFieldUpdateOperationsInput | string | null
    totalMonthlyBudget?: NullableStringFieldUpdateOperationsInput | string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserUpdateworkingDaysInput | string[]
    minimumProjectBudget?: NullableStringFieldUpdateOperationsInput | string | null
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    idDocument?: NullableStringFieldUpdateOperationsInput | string | null
    addressProof?: NullableStringFieldUpdateOperationsInput | string | null
    taxInformation?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    jobsPosted?: JobUncheckedUpdateManyWithoutClientNestedInput
    proposals?: ProposalUncheckedUpdateManyWithoutFreelancerNestedInput
    receivedReviews?: ReviewUncheckedUpdateManyWithoutReceiverNestedInput
    messages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    savedFreelancers?: SavedFreelancerUncheckedUpdateManyWithoutUserNestedInput
    savedByUsers?: SavedFreelancerUncheckedUpdateManyWithoutFreelancerNestedInput
  }

  export type UserUpsertWithoutReceivedReviewsInput = {
    update: XOR<UserUpdateWithoutReceivedReviewsInput, UserUncheckedUpdateWithoutReceivedReviewsInput>
    create: XOR<UserCreateWithoutReceivedReviewsInput, UserUncheckedCreateWithoutReceivedReviewsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReceivedReviewsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReceivedReviewsInput, UserUncheckedUpdateWithoutReceivedReviewsInput>
  }

  export type UserUpdateWithoutReceivedReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isOnboarded?: BoolFieldUpdateOperationsInput | boolean
    onboardingStep?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    overview?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserUpdatetopSkillsInput | string[]
    serviceOfferings?: UserUpdateserviceOfferingsInput | string[]
    hourlyRate?: NullableFloatFieldUpdateOperationsInput | number | null
    portfolio?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserUpdatecertificationsInput | string[]
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalEarnings?: NullableStringFieldUpdateOperationsInput | string | null
    successRate?: NullableIntFieldUpdateOperationsInput | number | null
    completedJobs?: NullableIntFieldUpdateOperationsInput | number | null
    onTime?: NullableIntFieldUpdateOperationsInput | number | null
    onBudget?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableStringFieldUpdateOperationsInput | string | null
    lastActive?: NullableStringFieldUpdateOperationsInput | string | null
    topRatedPlus?: BoolFieldUpdateOperationsInput | boolean
    verified?: BoolFieldUpdateOperationsInput | boolean
    risingTalent?: BoolFieldUpdateOperationsInput | boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserUpdatespecializationsInput | string[]
    memberSince?: NullableStringFieldUpdateOperationsInput | string | null
    profileStrength?: NullableIntFieldUpdateOperationsInput | number | null
    repeatHireRate?: NullableIntFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    reviewCount?: NullableIntFieldUpdateOperationsInput | number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    hourlyRateRange?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityStatus?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    companyWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    companyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    projectTypes?: UserUpdateprojectTypesInput | string[]
    preferredSkills?: UserUpdatepreferredSkillsInput | string[]
    budgetRange?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: NullableStringFieldUpdateOperationsInput | string | null
    howDidYouHear?: NullableStringFieldUpdateOperationsInput | string | null
    interestedCategories?: UserUpdateinterestedCategoriesInput | string[]
    urgencyLevel?: NullableStringFieldUpdateOperationsInput | string | null
    preferredWorkingStyle?: NullableStringFieldUpdateOperationsInput | string | null
    communicationPreference?: UserUpdatecommunicationPreferenceInput | string[]
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null
    paymentPreference?: NullableStringFieldUpdateOperationsInput | string | null
    projectFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    averageProjectDuration?: NullableStringFieldUpdateOperationsInput | string | null
    maxHourlyRate?: NullableStringFieldUpdateOperationsInput | string | null
    totalMonthlyBudget?: NullableStringFieldUpdateOperationsInput | string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserUpdateworkingDaysInput | string[]
    minimumProjectBudget?: NullableStringFieldUpdateOperationsInput | string | null
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    idDocument?: NullableStringFieldUpdateOperationsInput | string | null
    addressProof?: NullableStringFieldUpdateOperationsInput | string | null
    taxInformation?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    jobsPosted?: JobUpdateManyWithoutClientNestedInput
    proposals?: ProposalUpdateManyWithoutFreelancerNestedInput
    reviews?: ReviewUpdateManyWithoutAuthorNestedInput
    messages?: MessageUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    savedFreelancers?: SavedFreelancerUpdateManyWithoutUserNestedInput
    savedByUsers?: SavedFreelancerUpdateManyWithoutFreelancerNestedInput
  }

  export type UserUncheckedUpdateWithoutReceivedReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isOnboarded?: BoolFieldUpdateOperationsInput | boolean
    onboardingStep?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    overview?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserUpdatetopSkillsInput | string[]
    serviceOfferings?: UserUpdateserviceOfferingsInput | string[]
    hourlyRate?: NullableFloatFieldUpdateOperationsInput | number | null
    portfolio?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserUpdatecertificationsInput | string[]
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalEarnings?: NullableStringFieldUpdateOperationsInput | string | null
    successRate?: NullableIntFieldUpdateOperationsInput | number | null
    completedJobs?: NullableIntFieldUpdateOperationsInput | number | null
    onTime?: NullableIntFieldUpdateOperationsInput | number | null
    onBudget?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableStringFieldUpdateOperationsInput | string | null
    lastActive?: NullableStringFieldUpdateOperationsInput | string | null
    topRatedPlus?: BoolFieldUpdateOperationsInput | boolean
    verified?: BoolFieldUpdateOperationsInput | boolean
    risingTalent?: BoolFieldUpdateOperationsInput | boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserUpdatespecializationsInput | string[]
    memberSince?: NullableStringFieldUpdateOperationsInput | string | null
    profileStrength?: NullableIntFieldUpdateOperationsInput | number | null
    repeatHireRate?: NullableIntFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    reviewCount?: NullableIntFieldUpdateOperationsInput | number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    hourlyRateRange?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityStatus?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    companyWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    companyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    projectTypes?: UserUpdateprojectTypesInput | string[]
    preferredSkills?: UserUpdatepreferredSkillsInput | string[]
    budgetRange?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: NullableStringFieldUpdateOperationsInput | string | null
    howDidYouHear?: NullableStringFieldUpdateOperationsInput | string | null
    interestedCategories?: UserUpdateinterestedCategoriesInput | string[]
    urgencyLevel?: NullableStringFieldUpdateOperationsInput | string | null
    preferredWorkingStyle?: NullableStringFieldUpdateOperationsInput | string | null
    communicationPreference?: UserUpdatecommunicationPreferenceInput | string[]
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null
    paymentPreference?: NullableStringFieldUpdateOperationsInput | string | null
    projectFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    averageProjectDuration?: NullableStringFieldUpdateOperationsInput | string | null
    maxHourlyRate?: NullableStringFieldUpdateOperationsInput | string | null
    totalMonthlyBudget?: NullableStringFieldUpdateOperationsInput | string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserUpdateworkingDaysInput | string[]
    minimumProjectBudget?: NullableStringFieldUpdateOperationsInput | string | null
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    idDocument?: NullableStringFieldUpdateOperationsInput | string | null
    addressProof?: NullableStringFieldUpdateOperationsInput | string | null
    taxInformation?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    jobsPosted?: JobUncheckedUpdateManyWithoutClientNestedInput
    proposals?: ProposalUncheckedUpdateManyWithoutFreelancerNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutAuthorNestedInput
    messages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    savedFreelancers?: SavedFreelancerUncheckedUpdateManyWithoutUserNestedInput
    savedByUsers?: SavedFreelancerUncheckedUpdateManyWithoutFreelancerNestedInput
  }

  export type JobUpsertWithoutReviewsInput = {
    update: XOR<JobUpdateWithoutReviewsInput, JobUncheckedUpdateWithoutReviewsInput>
    create: XOR<JobCreateWithoutReviewsInput, JobUncheckedCreateWithoutReviewsInput>
    where?: JobWhereInput
  }

  export type JobUpdateToOneWithWhereWithoutReviewsInput = {
    where?: JobWhereInput
    data: XOR<JobUpdateWithoutReviewsInput, JobUncheckedUpdateWithoutReviewsInput>
  }

  export type JobUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    requirements?: JobUpdaterequirementsInput | string[]
    budget?: EnumBudgetTypeFieldUpdateOperationsInput | $Enums.BudgetType
    minBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    maxBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    hourlyRate?: NullableFloatFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: JobUpdateskillsInput | string[]
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    projectType?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    communicationPreferences?: JobUpdatecommunicationPreferencesInput | string[]
    location?: NullableStringFieldUpdateOperationsInput | string | null
    isRemote?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    isUrgent?: BoolFieldUpdateOperationsInput | boolean
    visibility?: StringFieldUpdateOperationsInput | string
    applicationDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation?: ConversationUpdateManyWithoutJobNestedInput
    client?: UserUpdateOneRequiredWithoutJobsPostedNestedInput
    proposals?: ProposalUpdateManyWithoutJobNestedInput
  }

  export type JobUncheckedUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    requirements?: JobUpdaterequirementsInput | string[]
    budget?: EnumBudgetTypeFieldUpdateOperationsInput | $Enums.BudgetType
    minBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    maxBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    hourlyRate?: NullableFloatFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: JobUpdateskillsInput | string[]
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    projectType?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    communicationPreferences?: JobUpdatecommunicationPreferencesInput | string[]
    location?: NullableStringFieldUpdateOperationsInput | string | null
    isRemote?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    isUrgent?: BoolFieldUpdateOperationsInput | boolean
    visibility?: StringFieldUpdateOperationsInput | string
    applicationDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clientId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation?: ConversationUncheckedUpdateManyWithoutJobNestedInput
    proposals?: ProposalUncheckedUpdateManyWithoutJobNestedInput
  }

  export type JobCreateWithoutConversationInput = {
    id?: string
    title: string
    description: string
    requirements?: JobCreaterequirementsInput | string[]
    budget: $Enums.BudgetType
    minBudget?: number | null
    maxBudget?: number | null
    hourlyRate?: number | null
    duration?: string | null
    skills?: JobCreateskillsInput | string[]
    category: string
    subcategory?: string | null
    projectType?: string | null
    experienceLevel?: string | null
    workingHours?: string | null
    timezone?: string | null
    communicationPreferences?: JobCreatecommunicationPreferencesInput | string[]
    location?: string | null
    isRemote?: boolean
    status?: $Enums.JobStatus
    isUrgent?: boolean
    visibility?: string
    applicationDeadline?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    client: UserCreateNestedOneWithoutJobsPostedInput
    proposals?: ProposalCreateNestedManyWithoutJobInput
    reviews?: ReviewCreateNestedManyWithoutJobInput
  }

  export type JobUncheckedCreateWithoutConversationInput = {
    id?: string
    title: string
    description: string
    requirements?: JobCreaterequirementsInput | string[]
    budget: $Enums.BudgetType
    minBudget?: number | null
    maxBudget?: number | null
    hourlyRate?: number | null
    duration?: string | null
    skills?: JobCreateskillsInput | string[]
    category: string
    subcategory?: string | null
    projectType?: string | null
    experienceLevel?: string | null
    workingHours?: string | null
    timezone?: string | null
    communicationPreferences?: JobCreatecommunicationPreferencesInput | string[]
    location?: string | null
    isRemote?: boolean
    status?: $Enums.JobStatus
    isUrgent?: boolean
    visibility?: string
    applicationDeadline?: Date | string | null
    clientId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    proposals?: ProposalUncheckedCreateNestedManyWithoutJobInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutJobInput
  }

  export type JobCreateOrConnectWithoutConversationInput = {
    where: JobWhereUniqueInput
    create: XOR<JobCreateWithoutConversationInput, JobUncheckedCreateWithoutConversationInput>
  }

  export type MessageCreateWithoutConversationInput = {
    id?: string
    content: string
    isRead?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sender: UserCreateNestedOneWithoutMessagesInput
    receiver: UserCreateNestedOneWithoutReceivedMessagesInput
    conversationAsLastMessage?: ConversationCreateNestedManyWithoutLastMessageInput
  }

  export type MessageUncheckedCreateWithoutConversationInput = {
    id?: string
    content: string
    senderEmail: string
    receiverEmail: string
    isRead?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    conversationAsLastMessage?: ConversationUncheckedCreateNestedManyWithoutLastMessageInput
  }

  export type MessageCreateOrConnectWithoutConversationInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput>
  }

  export type MessageCreateManyConversationInputEnvelope = {
    data: MessageCreateManyConversationInput | MessageCreateManyConversationInput[]
    skipDuplicates?: boolean
  }

  export type MessageCreateWithoutConversationAsLastMessageInput = {
    id?: string
    content: string
    isRead?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sender: UserCreateNestedOneWithoutMessagesInput
    receiver: UserCreateNestedOneWithoutReceivedMessagesInput
    conversation: ConversationCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateWithoutConversationAsLastMessageInput = {
    id?: string
    content: string
    senderEmail: string
    receiverEmail: string
    conversationId: string
    isRead?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageCreateOrConnectWithoutConversationAsLastMessageInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutConversationAsLastMessageInput, MessageUncheckedCreateWithoutConversationAsLastMessageInput>
  }

  export type JobUpsertWithoutConversationInput = {
    update: XOR<JobUpdateWithoutConversationInput, JobUncheckedUpdateWithoutConversationInput>
    create: XOR<JobCreateWithoutConversationInput, JobUncheckedCreateWithoutConversationInput>
    where?: JobWhereInput
  }

  export type JobUpdateToOneWithWhereWithoutConversationInput = {
    where?: JobWhereInput
    data: XOR<JobUpdateWithoutConversationInput, JobUncheckedUpdateWithoutConversationInput>
  }

  export type JobUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    requirements?: JobUpdaterequirementsInput | string[]
    budget?: EnumBudgetTypeFieldUpdateOperationsInput | $Enums.BudgetType
    minBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    maxBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    hourlyRate?: NullableFloatFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: JobUpdateskillsInput | string[]
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    projectType?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    communicationPreferences?: JobUpdatecommunicationPreferencesInput | string[]
    location?: NullableStringFieldUpdateOperationsInput | string | null
    isRemote?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    isUrgent?: BoolFieldUpdateOperationsInput | boolean
    visibility?: StringFieldUpdateOperationsInput | string
    applicationDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: UserUpdateOneRequiredWithoutJobsPostedNestedInput
    proposals?: ProposalUpdateManyWithoutJobNestedInput
    reviews?: ReviewUpdateManyWithoutJobNestedInput
  }

  export type JobUncheckedUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    requirements?: JobUpdaterequirementsInput | string[]
    budget?: EnumBudgetTypeFieldUpdateOperationsInput | $Enums.BudgetType
    minBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    maxBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    hourlyRate?: NullableFloatFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: JobUpdateskillsInput | string[]
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    projectType?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    communicationPreferences?: JobUpdatecommunicationPreferencesInput | string[]
    location?: NullableStringFieldUpdateOperationsInput | string | null
    isRemote?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    isUrgent?: BoolFieldUpdateOperationsInput | boolean
    visibility?: StringFieldUpdateOperationsInput | string
    applicationDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clientId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proposals?: ProposalUncheckedUpdateManyWithoutJobNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutJobNestedInput
  }

  export type MessageUpsertWithWhereUniqueWithoutConversationInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutConversationInput, MessageUncheckedUpdateWithoutConversationInput>
    create: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutConversationInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutConversationInput, MessageUncheckedUpdateWithoutConversationInput>
  }

  export type MessageUpdateManyWithWhereWithoutConversationInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutConversationInput>
  }

  export type MessageUpsertWithoutConversationAsLastMessageInput = {
    update: XOR<MessageUpdateWithoutConversationAsLastMessageInput, MessageUncheckedUpdateWithoutConversationAsLastMessageInput>
    create: XOR<MessageCreateWithoutConversationAsLastMessageInput, MessageUncheckedCreateWithoutConversationAsLastMessageInput>
    where?: MessageWhereInput
  }

  export type MessageUpdateToOneWithWhereWithoutConversationAsLastMessageInput = {
    where?: MessageWhereInput
    data: XOR<MessageUpdateWithoutConversationAsLastMessageInput, MessageUncheckedUpdateWithoutConversationAsLastMessageInput>
  }

  export type MessageUpdateWithoutConversationAsLastMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: UserUpdateOneRequiredWithoutMessagesNestedInput
    receiver?: UserUpdateOneRequiredWithoutReceivedMessagesNestedInput
    conversation?: ConversationUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateWithoutConversationAsLastMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    senderEmail?: StringFieldUpdateOperationsInput | string
    receiverEmail?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutMessagesInput = {
    id?: string
    googleId?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    avatar?: string | null
    bio?: string | null
    location?: string | null
    phone?: string | null
    userType?: $Enums.UserType
    isOnboarded?: boolean
    onboardingStep?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    country?: string | null
    city?: string | null
    timezone?: string | null
    title?: string | null
    overview?: string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserCreatetopSkillsInput | string[]
    serviceOfferings?: UserCreateserviceOfferingsInput | string[]
    hourlyRate?: number | null
    portfolio?: string | null
    experience?: string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserCreatecertificationsInput | string[]
    availability?: string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: string | null
    subcategory?: string | null
    experienceLevel?: string | null
    totalEarnings?: string | null
    successRate?: number | null
    completedJobs?: number | null
    onTime?: number | null
    onBudget?: number | null
    responseTime?: string | null
    lastActive?: string | null
    topRatedPlus?: boolean
    verified?: boolean
    risingTalent?: boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserCreatespecializationsInput | string[]
    memberSince?: string | null
    profileStrength?: number | null
    repeatHireRate?: number | null
    rating?: number | null
    reviewCount?: number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: string | null
    isOnline?: boolean
    hourlyRateRange?: string | null
    availabilityStatus?: string | null
    companyName?: string | null
    companySize?: string | null
    industry?: string | null
    companyWebsite?: string | null
    companyDescription?: string | null
    projectTypes?: UserCreateprojectTypesInput | string[]
    preferredSkills?: UserCreatepreferredSkillsInput | string[]
    budgetRange?: string | null
    clientType?: string | null
    howDidYouHear?: string | null
    interestedCategories?: UserCreateinterestedCategoriesInput | string[]
    urgencyLevel?: string | null
    preferredWorkingStyle?: string | null
    communicationPreference?: UserCreatecommunicationPreferenceInput | string[]
    projectDescription?: string | null
    paymentPreference?: string | null
    projectFrequency?: string | null
    averageProjectDuration?: string | null
    maxHourlyRate?: string | null
    totalMonthlyBudget?: string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserCreateworkingDaysInput | string[]
    minimumProjectBudget?: string | null
    specialRequirements?: string | null
    idDocument?: string | null
    addressProof?: string | null
    taxInformation?: string | null
    phoneVerified?: boolean
    jobsPosted?: JobCreateNestedManyWithoutClientInput
    proposals?: ProposalCreateNestedManyWithoutFreelancerInput
    reviews?: ReviewCreateNestedManyWithoutAuthorInput
    receivedReviews?: ReviewCreateNestedManyWithoutReceiverInput
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    savedFreelancers?: SavedFreelancerCreateNestedManyWithoutUserInput
    savedByUsers?: SavedFreelancerCreateNestedManyWithoutFreelancerInput
  }

  export type UserUncheckedCreateWithoutMessagesInput = {
    id?: string
    googleId?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    avatar?: string | null
    bio?: string | null
    location?: string | null
    phone?: string | null
    userType?: $Enums.UserType
    isOnboarded?: boolean
    onboardingStep?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    country?: string | null
    city?: string | null
    timezone?: string | null
    title?: string | null
    overview?: string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserCreatetopSkillsInput | string[]
    serviceOfferings?: UserCreateserviceOfferingsInput | string[]
    hourlyRate?: number | null
    portfolio?: string | null
    experience?: string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserCreatecertificationsInput | string[]
    availability?: string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: string | null
    subcategory?: string | null
    experienceLevel?: string | null
    totalEarnings?: string | null
    successRate?: number | null
    completedJobs?: number | null
    onTime?: number | null
    onBudget?: number | null
    responseTime?: string | null
    lastActive?: string | null
    topRatedPlus?: boolean
    verified?: boolean
    risingTalent?: boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserCreatespecializationsInput | string[]
    memberSince?: string | null
    profileStrength?: number | null
    repeatHireRate?: number | null
    rating?: number | null
    reviewCount?: number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: string | null
    isOnline?: boolean
    hourlyRateRange?: string | null
    availabilityStatus?: string | null
    companyName?: string | null
    companySize?: string | null
    industry?: string | null
    companyWebsite?: string | null
    companyDescription?: string | null
    projectTypes?: UserCreateprojectTypesInput | string[]
    preferredSkills?: UserCreatepreferredSkillsInput | string[]
    budgetRange?: string | null
    clientType?: string | null
    howDidYouHear?: string | null
    interestedCategories?: UserCreateinterestedCategoriesInput | string[]
    urgencyLevel?: string | null
    preferredWorkingStyle?: string | null
    communicationPreference?: UserCreatecommunicationPreferenceInput | string[]
    projectDescription?: string | null
    paymentPreference?: string | null
    projectFrequency?: string | null
    averageProjectDuration?: string | null
    maxHourlyRate?: string | null
    totalMonthlyBudget?: string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserCreateworkingDaysInput | string[]
    minimumProjectBudget?: string | null
    specialRequirements?: string | null
    idDocument?: string | null
    addressProof?: string | null
    taxInformation?: string | null
    phoneVerified?: boolean
    jobsPosted?: JobUncheckedCreateNestedManyWithoutClientInput
    proposals?: ProposalUncheckedCreateNestedManyWithoutFreelancerInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutAuthorInput
    receivedReviews?: ReviewUncheckedCreateNestedManyWithoutReceiverInput
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    savedFreelancers?: SavedFreelancerUncheckedCreateNestedManyWithoutUserInput
    savedByUsers?: SavedFreelancerUncheckedCreateNestedManyWithoutFreelancerInput
  }

  export type UserCreateOrConnectWithoutMessagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
  }

  export type UserCreateWithoutReceivedMessagesInput = {
    id?: string
    googleId?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    avatar?: string | null
    bio?: string | null
    location?: string | null
    phone?: string | null
    userType?: $Enums.UserType
    isOnboarded?: boolean
    onboardingStep?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    country?: string | null
    city?: string | null
    timezone?: string | null
    title?: string | null
    overview?: string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserCreatetopSkillsInput | string[]
    serviceOfferings?: UserCreateserviceOfferingsInput | string[]
    hourlyRate?: number | null
    portfolio?: string | null
    experience?: string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserCreatecertificationsInput | string[]
    availability?: string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: string | null
    subcategory?: string | null
    experienceLevel?: string | null
    totalEarnings?: string | null
    successRate?: number | null
    completedJobs?: number | null
    onTime?: number | null
    onBudget?: number | null
    responseTime?: string | null
    lastActive?: string | null
    topRatedPlus?: boolean
    verified?: boolean
    risingTalent?: boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserCreatespecializationsInput | string[]
    memberSince?: string | null
    profileStrength?: number | null
    repeatHireRate?: number | null
    rating?: number | null
    reviewCount?: number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: string | null
    isOnline?: boolean
    hourlyRateRange?: string | null
    availabilityStatus?: string | null
    companyName?: string | null
    companySize?: string | null
    industry?: string | null
    companyWebsite?: string | null
    companyDescription?: string | null
    projectTypes?: UserCreateprojectTypesInput | string[]
    preferredSkills?: UserCreatepreferredSkillsInput | string[]
    budgetRange?: string | null
    clientType?: string | null
    howDidYouHear?: string | null
    interestedCategories?: UserCreateinterestedCategoriesInput | string[]
    urgencyLevel?: string | null
    preferredWorkingStyle?: string | null
    communicationPreference?: UserCreatecommunicationPreferenceInput | string[]
    projectDescription?: string | null
    paymentPreference?: string | null
    projectFrequency?: string | null
    averageProjectDuration?: string | null
    maxHourlyRate?: string | null
    totalMonthlyBudget?: string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserCreateworkingDaysInput | string[]
    minimumProjectBudget?: string | null
    specialRequirements?: string | null
    idDocument?: string | null
    addressProof?: string | null
    taxInformation?: string | null
    phoneVerified?: boolean
    jobsPosted?: JobCreateNestedManyWithoutClientInput
    proposals?: ProposalCreateNestedManyWithoutFreelancerInput
    reviews?: ReviewCreateNestedManyWithoutAuthorInput
    receivedReviews?: ReviewCreateNestedManyWithoutReceiverInput
    messages?: MessageCreateNestedManyWithoutSenderInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    savedFreelancers?: SavedFreelancerCreateNestedManyWithoutUserInput
    savedByUsers?: SavedFreelancerCreateNestedManyWithoutFreelancerInput
  }

  export type UserUncheckedCreateWithoutReceivedMessagesInput = {
    id?: string
    googleId?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    avatar?: string | null
    bio?: string | null
    location?: string | null
    phone?: string | null
    userType?: $Enums.UserType
    isOnboarded?: boolean
    onboardingStep?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    country?: string | null
    city?: string | null
    timezone?: string | null
    title?: string | null
    overview?: string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserCreatetopSkillsInput | string[]
    serviceOfferings?: UserCreateserviceOfferingsInput | string[]
    hourlyRate?: number | null
    portfolio?: string | null
    experience?: string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserCreatecertificationsInput | string[]
    availability?: string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: string | null
    subcategory?: string | null
    experienceLevel?: string | null
    totalEarnings?: string | null
    successRate?: number | null
    completedJobs?: number | null
    onTime?: number | null
    onBudget?: number | null
    responseTime?: string | null
    lastActive?: string | null
    topRatedPlus?: boolean
    verified?: boolean
    risingTalent?: boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserCreatespecializationsInput | string[]
    memberSince?: string | null
    profileStrength?: number | null
    repeatHireRate?: number | null
    rating?: number | null
    reviewCount?: number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: string | null
    isOnline?: boolean
    hourlyRateRange?: string | null
    availabilityStatus?: string | null
    companyName?: string | null
    companySize?: string | null
    industry?: string | null
    companyWebsite?: string | null
    companyDescription?: string | null
    projectTypes?: UserCreateprojectTypesInput | string[]
    preferredSkills?: UserCreatepreferredSkillsInput | string[]
    budgetRange?: string | null
    clientType?: string | null
    howDidYouHear?: string | null
    interestedCategories?: UserCreateinterestedCategoriesInput | string[]
    urgencyLevel?: string | null
    preferredWorkingStyle?: string | null
    communicationPreference?: UserCreatecommunicationPreferenceInput | string[]
    projectDescription?: string | null
    paymentPreference?: string | null
    projectFrequency?: string | null
    averageProjectDuration?: string | null
    maxHourlyRate?: string | null
    totalMonthlyBudget?: string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserCreateworkingDaysInput | string[]
    minimumProjectBudget?: string | null
    specialRequirements?: string | null
    idDocument?: string | null
    addressProof?: string | null
    taxInformation?: string | null
    phoneVerified?: boolean
    jobsPosted?: JobUncheckedCreateNestedManyWithoutClientInput
    proposals?: ProposalUncheckedCreateNestedManyWithoutFreelancerInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutAuthorInput
    receivedReviews?: ReviewUncheckedCreateNestedManyWithoutReceiverInput
    messages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    savedFreelancers?: SavedFreelancerUncheckedCreateNestedManyWithoutUserInput
    savedByUsers?: SavedFreelancerUncheckedCreateNestedManyWithoutFreelancerInput
  }

  export type UserCreateOrConnectWithoutReceivedMessagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReceivedMessagesInput, UserUncheckedCreateWithoutReceivedMessagesInput>
  }

  export type ConversationCreateWithoutMessagesInput = {
    id?: string
    participants?: ConversationCreateparticipantsInput | string[]
    projectName?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    job?: JobCreateNestedOneWithoutConversationInput
    lastMessage?: MessageCreateNestedOneWithoutConversationAsLastMessageInput
  }

  export type ConversationUncheckedCreateWithoutMessagesInput = {
    id?: string
    participants?: ConversationCreateparticipantsInput | string[]
    jobId?: string | null
    projectName?: string | null
    isActive?: boolean
    lastMessageId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConversationCreateOrConnectWithoutMessagesInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
  }

  export type ConversationCreateWithoutLastMessageInput = {
    id?: string
    participants?: ConversationCreateparticipantsInput | string[]
    projectName?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    job?: JobCreateNestedOneWithoutConversationInput
    messages?: MessageCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateWithoutLastMessageInput = {
    id?: string
    participants?: ConversationCreateparticipantsInput | string[]
    jobId?: string | null
    projectName?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationCreateOrConnectWithoutLastMessageInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutLastMessageInput, ConversationUncheckedCreateWithoutLastMessageInput>
  }

  export type ConversationCreateManyLastMessageInputEnvelope = {
    data: ConversationCreateManyLastMessageInput | ConversationCreateManyLastMessageInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutMessagesInput = {
    update: XOR<UserUpdateWithoutMessagesInput, UserUncheckedUpdateWithoutMessagesInput>
    create: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMessagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMessagesInput, UserUncheckedUpdateWithoutMessagesInput>
  }

  export type UserUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isOnboarded?: BoolFieldUpdateOperationsInput | boolean
    onboardingStep?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    overview?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserUpdatetopSkillsInput | string[]
    serviceOfferings?: UserUpdateserviceOfferingsInput | string[]
    hourlyRate?: NullableFloatFieldUpdateOperationsInput | number | null
    portfolio?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserUpdatecertificationsInput | string[]
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalEarnings?: NullableStringFieldUpdateOperationsInput | string | null
    successRate?: NullableIntFieldUpdateOperationsInput | number | null
    completedJobs?: NullableIntFieldUpdateOperationsInput | number | null
    onTime?: NullableIntFieldUpdateOperationsInput | number | null
    onBudget?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableStringFieldUpdateOperationsInput | string | null
    lastActive?: NullableStringFieldUpdateOperationsInput | string | null
    topRatedPlus?: BoolFieldUpdateOperationsInput | boolean
    verified?: BoolFieldUpdateOperationsInput | boolean
    risingTalent?: BoolFieldUpdateOperationsInput | boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserUpdatespecializationsInput | string[]
    memberSince?: NullableStringFieldUpdateOperationsInput | string | null
    profileStrength?: NullableIntFieldUpdateOperationsInput | number | null
    repeatHireRate?: NullableIntFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    reviewCount?: NullableIntFieldUpdateOperationsInput | number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    hourlyRateRange?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityStatus?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    companyWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    companyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    projectTypes?: UserUpdateprojectTypesInput | string[]
    preferredSkills?: UserUpdatepreferredSkillsInput | string[]
    budgetRange?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: NullableStringFieldUpdateOperationsInput | string | null
    howDidYouHear?: NullableStringFieldUpdateOperationsInput | string | null
    interestedCategories?: UserUpdateinterestedCategoriesInput | string[]
    urgencyLevel?: NullableStringFieldUpdateOperationsInput | string | null
    preferredWorkingStyle?: NullableStringFieldUpdateOperationsInput | string | null
    communicationPreference?: UserUpdatecommunicationPreferenceInput | string[]
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null
    paymentPreference?: NullableStringFieldUpdateOperationsInput | string | null
    projectFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    averageProjectDuration?: NullableStringFieldUpdateOperationsInput | string | null
    maxHourlyRate?: NullableStringFieldUpdateOperationsInput | string | null
    totalMonthlyBudget?: NullableStringFieldUpdateOperationsInput | string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserUpdateworkingDaysInput | string[]
    minimumProjectBudget?: NullableStringFieldUpdateOperationsInput | string | null
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    idDocument?: NullableStringFieldUpdateOperationsInput | string | null
    addressProof?: NullableStringFieldUpdateOperationsInput | string | null
    taxInformation?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    jobsPosted?: JobUpdateManyWithoutClientNestedInput
    proposals?: ProposalUpdateManyWithoutFreelancerNestedInput
    reviews?: ReviewUpdateManyWithoutAuthorNestedInput
    receivedReviews?: ReviewUpdateManyWithoutReceiverNestedInput
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    savedFreelancers?: SavedFreelancerUpdateManyWithoutUserNestedInput
    savedByUsers?: SavedFreelancerUpdateManyWithoutFreelancerNestedInput
  }

  export type UserUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isOnboarded?: BoolFieldUpdateOperationsInput | boolean
    onboardingStep?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    overview?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserUpdatetopSkillsInput | string[]
    serviceOfferings?: UserUpdateserviceOfferingsInput | string[]
    hourlyRate?: NullableFloatFieldUpdateOperationsInput | number | null
    portfolio?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserUpdatecertificationsInput | string[]
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalEarnings?: NullableStringFieldUpdateOperationsInput | string | null
    successRate?: NullableIntFieldUpdateOperationsInput | number | null
    completedJobs?: NullableIntFieldUpdateOperationsInput | number | null
    onTime?: NullableIntFieldUpdateOperationsInput | number | null
    onBudget?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableStringFieldUpdateOperationsInput | string | null
    lastActive?: NullableStringFieldUpdateOperationsInput | string | null
    topRatedPlus?: BoolFieldUpdateOperationsInput | boolean
    verified?: BoolFieldUpdateOperationsInput | boolean
    risingTalent?: BoolFieldUpdateOperationsInput | boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserUpdatespecializationsInput | string[]
    memberSince?: NullableStringFieldUpdateOperationsInput | string | null
    profileStrength?: NullableIntFieldUpdateOperationsInput | number | null
    repeatHireRate?: NullableIntFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    reviewCount?: NullableIntFieldUpdateOperationsInput | number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    hourlyRateRange?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityStatus?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    companyWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    companyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    projectTypes?: UserUpdateprojectTypesInput | string[]
    preferredSkills?: UserUpdatepreferredSkillsInput | string[]
    budgetRange?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: NullableStringFieldUpdateOperationsInput | string | null
    howDidYouHear?: NullableStringFieldUpdateOperationsInput | string | null
    interestedCategories?: UserUpdateinterestedCategoriesInput | string[]
    urgencyLevel?: NullableStringFieldUpdateOperationsInput | string | null
    preferredWorkingStyle?: NullableStringFieldUpdateOperationsInput | string | null
    communicationPreference?: UserUpdatecommunicationPreferenceInput | string[]
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null
    paymentPreference?: NullableStringFieldUpdateOperationsInput | string | null
    projectFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    averageProjectDuration?: NullableStringFieldUpdateOperationsInput | string | null
    maxHourlyRate?: NullableStringFieldUpdateOperationsInput | string | null
    totalMonthlyBudget?: NullableStringFieldUpdateOperationsInput | string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserUpdateworkingDaysInput | string[]
    minimumProjectBudget?: NullableStringFieldUpdateOperationsInput | string | null
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    idDocument?: NullableStringFieldUpdateOperationsInput | string | null
    addressProof?: NullableStringFieldUpdateOperationsInput | string | null
    taxInformation?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    jobsPosted?: JobUncheckedUpdateManyWithoutClientNestedInput
    proposals?: ProposalUncheckedUpdateManyWithoutFreelancerNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutAuthorNestedInput
    receivedReviews?: ReviewUncheckedUpdateManyWithoutReceiverNestedInput
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    savedFreelancers?: SavedFreelancerUncheckedUpdateManyWithoutUserNestedInput
    savedByUsers?: SavedFreelancerUncheckedUpdateManyWithoutFreelancerNestedInput
  }

  export type UserUpsertWithoutReceivedMessagesInput = {
    update: XOR<UserUpdateWithoutReceivedMessagesInput, UserUncheckedUpdateWithoutReceivedMessagesInput>
    create: XOR<UserCreateWithoutReceivedMessagesInput, UserUncheckedCreateWithoutReceivedMessagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReceivedMessagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReceivedMessagesInput, UserUncheckedUpdateWithoutReceivedMessagesInput>
  }

  export type UserUpdateWithoutReceivedMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isOnboarded?: BoolFieldUpdateOperationsInput | boolean
    onboardingStep?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    overview?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserUpdatetopSkillsInput | string[]
    serviceOfferings?: UserUpdateserviceOfferingsInput | string[]
    hourlyRate?: NullableFloatFieldUpdateOperationsInput | number | null
    portfolio?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserUpdatecertificationsInput | string[]
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalEarnings?: NullableStringFieldUpdateOperationsInput | string | null
    successRate?: NullableIntFieldUpdateOperationsInput | number | null
    completedJobs?: NullableIntFieldUpdateOperationsInput | number | null
    onTime?: NullableIntFieldUpdateOperationsInput | number | null
    onBudget?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableStringFieldUpdateOperationsInput | string | null
    lastActive?: NullableStringFieldUpdateOperationsInput | string | null
    topRatedPlus?: BoolFieldUpdateOperationsInput | boolean
    verified?: BoolFieldUpdateOperationsInput | boolean
    risingTalent?: BoolFieldUpdateOperationsInput | boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserUpdatespecializationsInput | string[]
    memberSince?: NullableStringFieldUpdateOperationsInput | string | null
    profileStrength?: NullableIntFieldUpdateOperationsInput | number | null
    repeatHireRate?: NullableIntFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    reviewCount?: NullableIntFieldUpdateOperationsInput | number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    hourlyRateRange?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityStatus?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    companyWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    companyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    projectTypes?: UserUpdateprojectTypesInput | string[]
    preferredSkills?: UserUpdatepreferredSkillsInput | string[]
    budgetRange?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: NullableStringFieldUpdateOperationsInput | string | null
    howDidYouHear?: NullableStringFieldUpdateOperationsInput | string | null
    interestedCategories?: UserUpdateinterestedCategoriesInput | string[]
    urgencyLevel?: NullableStringFieldUpdateOperationsInput | string | null
    preferredWorkingStyle?: NullableStringFieldUpdateOperationsInput | string | null
    communicationPreference?: UserUpdatecommunicationPreferenceInput | string[]
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null
    paymentPreference?: NullableStringFieldUpdateOperationsInput | string | null
    projectFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    averageProjectDuration?: NullableStringFieldUpdateOperationsInput | string | null
    maxHourlyRate?: NullableStringFieldUpdateOperationsInput | string | null
    totalMonthlyBudget?: NullableStringFieldUpdateOperationsInput | string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserUpdateworkingDaysInput | string[]
    minimumProjectBudget?: NullableStringFieldUpdateOperationsInput | string | null
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    idDocument?: NullableStringFieldUpdateOperationsInput | string | null
    addressProof?: NullableStringFieldUpdateOperationsInput | string | null
    taxInformation?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    jobsPosted?: JobUpdateManyWithoutClientNestedInput
    proposals?: ProposalUpdateManyWithoutFreelancerNestedInput
    reviews?: ReviewUpdateManyWithoutAuthorNestedInput
    receivedReviews?: ReviewUpdateManyWithoutReceiverNestedInput
    messages?: MessageUpdateManyWithoutSenderNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    savedFreelancers?: SavedFreelancerUpdateManyWithoutUserNestedInput
    savedByUsers?: SavedFreelancerUpdateManyWithoutFreelancerNestedInput
  }

  export type UserUncheckedUpdateWithoutReceivedMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isOnboarded?: BoolFieldUpdateOperationsInput | boolean
    onboardingStep?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    overview?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserUpdatetopSkillsInput | string[]
    serviceOfferings?: UserUpdateserviceOfferingsInput | string[]
    hourlyRate?: NullableFloatFieldUpdateOperationsInput | number | null
    portfolio?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserUpdatecertificationsInput | string[]
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalEarnings?: NullableStringFieldUpdateOperationsInput | string | null
    successRate?: NullableIntFieldUpdateOperationsInput | number | null
    completedJobs?: NullableIntFieldUpdateOperationsInput | number | null
    onTime?: NullableIntFieldUpdateOperationsInput | number | null
    onBudget?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableStringFieldUpdateOperationsInput | string | null
    lastActive?: NullableStringFieldUpdateOperationsInput | string | null
    topRatedPlus?: BoolFieldUpdateOperationsInput | boolean
    verified?: BoolFieldUpdateOperationsInput | boolean
    risingTalent?: BoolFieldUpdateOperationsInput | boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserUpdatespecializationsInput | string[]
    memberSince?: NullableStringFieldUpdateOperationsInput | string | null
    profileStrength?: NullableIntFieldUpdateOperationsInput | number | null
    repeatHireRate?: NullableIntFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    reviewCount?: NullableIntFieldUpdateOperationsInput | number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    hourlyRateRange?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityStatus?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    companyWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    companyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    projectTypes?: UserUpdateprojectTypesInput | string[]
    preferredSkills?: UserUpdatepreferredSkillsInput | string[]
    budgetRange?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: NullableStringFieldUpdateOperationsInput | string | null
    howDidYouHear?: NullableStringFieldUpdateOperationsInput | string | null
    interestedCategories?: UserUpdateinterestedCategoriesInput | string[]
    urgencyLevel?: NullableStringFieldUpdateOperationsInput | string | null
    preferredWorkingStyle?: NullableStringFieldUpdateOperationsInput | string | null
    communicationPreference?: UserUpdatecommunicationPreferenceInput | string[]
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null
    paymentPreference?: NullableStringFieldUpdateOperationsInput | string | null
    projectFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    averageProjectDuration?: NullableStringFieldUpdateOperationsInput | string | null
    maxHourlyRate?: NullableStringFieldUpdateOperationsInput | string | null
    totalMonthlyBudget?: NullableStringFieldUpdateOperationsInput | string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserUpdateworkingDaysInput | string[]
    minimumProjectBudget?: NullableStringFieldUpdateOperationsInput | string | null
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    idDocument?: NullableStringFieldUpdateOperationsInput | string | null
    addressProof?: NullableStringFieldUpdateOperationsInput | string | null
    taxInformation?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    jobsPosted?: JobUncheckedUpdateManyWithoutClientNestedInput
    proposals?: ProposalUncheckedUpdateManyWithoutFreelancerNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutAuthorNestedInput
    receivedReviews?: ReviewUncheckedUpdateManyWithoutReceiverNestedInput
    messages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    savedFreelancers?: SavedFreelancerUncheckedUpdateManyWithoutUserNestedInput
    savedByUsers?: SavedFreelancerUncheckedUpdateManyWithoutFreelancerNestedInput
  }

  export type ConversationUpsertWithoutMessagesInput = {
    update: XOR<ConversationUpdateWithoutMessagesInput, ConversationUncheckedUpdateWithoutMessagesInput>
    create: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
    where?: ConversationWhereInput
  }

  export type ConversationUpdateToOneWithWhereWithoutMessagesInput = {
    where?: ConversationWhereInput
    data: XOR<ConversationUpdateWithoutMessagesInput, ConversationUncheckedUpdateWithoutMessagesInput>
  }

  export type ConversationUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    participants?: ConversationUpdateparticipantsInput | string[]
    projectName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    job?: JobUpdateOneWithoutConversationNestedInput
    lastMessage?: MessageUpdateOneWithoutConversationAsLastMessageNestedInput
  }

  export type ConversationUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    participants?: ConversationUpdateparticipantsInput | string[]
    jobId?: NullableStringFieldUpdateOperationsInput | string | null
    projectName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationUpsertWithWhereUniqueWithoutLastMessageInput = {
    where: ConversationWhereUniqueInput
    update: XOR<ConversationUpdateWithoutLastMessageInput, ConversationUncheckedUpdateWithoutLastMessageInput>
    create: XOR<ConversationCreateWithoutLastMessageInput, ConversationUncheckedCreateWithoutLastMessageInput>
  }

  export type ConversationUpdateWithWhereUniqueWithoutLastMessageInput = {
    where: ConversationWhereUniqueInput
    data: XOR<ConversationUpdateWithoutLastMessageInput, ConversationUncheckedUpdateWithoutLastMessageInput>
  }

  export type ConversationUpdateManyWithWhereWithoutLastMessageInput = {
    where: ConversationScalarWhereInput
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyWithoutLastMessageInput>
  }

  export type UserCreateWithoutNotificationsInput = {
    id?: string
    googleId?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    avatar?: string | null
    bio?: string | null
    location?: string | null
    phone?: string | null
    userType?: $Enums.UserType
    isOnboarded?: boolean
    onboardingStep?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    country?: string | null
    city?: string | null
    timezone?: string | null
    title?: string | null
    overview?: string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserCreatetopSkillsInput | string[]
    serviceOfferings?: UserCreateserviceOfferingsInput | string[]
    hourlyRate?: number | null
    portfolio?: string | null
    experience?: string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserCreatecertificationsInput | string[]
    availability?: string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: string | null
    subcategory?: string | null
    experienceLevel?: string | null
    totalEarnings?: string | null
    successRate?: number | null
    completedJobs?: number | null
    onTime?: number | null
    onBudget?: number | null
    responseTime?: string | null
    lastActive?: string | null
    topRatedPlus?: boolean
    verified?: boolean
    risingTalent?: boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserCreatespecializationsInput | string[]
    memberSince?: string | null
    profileStrength?: number | null
    repeatHireRate?: number | null
    rating?: number | null
    reviewCount?: number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: string | null
    isOnline?: boolean
    hourlyRateRange?: string | null
    availabilityStatus?: string | null
    companyName?: string | null
    companySize?: string | null
    industry?: string | null
    companyWebsite?: string | null
    companyDescription?: string | null
    projectTypes?: UserCreateprojectTypesInput | string[]
    preferredSkills?: UserCreatepreferredSkillsInput | string[]
    budgetRange?: string | null
    clientType?: string | null
    howDidYouHear?: string | null
    interestedCategories?: UserCreateinterestedCategoriesInput | string[]
    urgencyLevel?: string | null
    preferredWorkingStyle?: string | null
    communicationPreference?: UserCreatecommunicationPreferenceInput | string[]
    projectDescription?: string | null
    paymentPreference?: string | null
    projectFrequency?: string | null
    averageProjectDuration?: string | null
    maxHourlyRate?: string | null
    totalMonthlyBudget?: string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserCreateworkingDaysInput | string[]
    minimumProjectBudget?: string | null
    specialRequirements?: string | null
    idDocument?: string | null
    addressProof?: string | null
    taxInformation?: string | null
    phoneVerified?: boolean
    jobsPosted?: JobCreateNestedManyWithoutClientInput
    proposals?: ProposalCreateNestedManyWithoutFreelancerInput
    reviews?: ReviewCreateNestedManyWithoutAuthorInput
    receivedReviews?: ReviewCreateNestedManyWithoutReceiverInput
    messages?: MessageCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput
    savedFreelancers?: SavedFreelancerCreateNestedManyWithoutUserInput
    savedByUsers?: SavedFreelancerCreateNestedManyWithoutFreelancerInput
  }

  export type UserUncheckedCreateWithoutNotificationsInput = {
    id?: string
    googleId?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    avatar?: string | null
    bio?: string | null
    location?: string | null
    phone?: string | null
    userType?: $Enums.UserType
    isOnboarded?: boolean
    onboardingStep?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    country?: string | null
    city?: string | null
    timezone?: string | null
    title?: string | null
    overview?: string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserCreatetopSkillsInput | string[]
    serviceOfferings?: UserCreateserviceOfferingsInput | string[]
    hourlyRate?: number | null
    portfolio?: string | null
    experience?: string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserCreatecertificationsInput | string[]
    availability?: string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: string | null
    subcategory?: string | null
    experienceLevel?: string | null
    totalEarnings?: string | null
    successRate?: number | null
    completedJobs?: number | null
    onTime?: number | null
    onBudget?: number | null
    responseTime?: string | null
    lastActive?: string | null
    topRatedPlus?: boolean
    verified?: boolean
    risingTalent?: boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserCreatespecializationsInput | string[]
    memberSince?: string | null
    profileStrength?: number | null
    repeatHireRate?: number | null
    rating?: number | null
    reviewCount?: number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: string | null
    isOnline?: boolean
    hourlyRateRange?: string | null
    availabilityStatus?: string | null
    companyName?: string | null
    companySize?: string | null
    industry?: string | null
    companyWebsite?: string | null
    companyDescription?: string | null
    projectTypes?: UserCreateprojectTypesInput | string[]
    preferredSkills?: UserCreatepreferredSkillsInput | string[]
    budgetRange?: string | null
    clientType?: string | null
    howDidYouHear?: string | null
    interestedCategories?: UserCreateinterestedCategoriesInput | string[]
    urgencyLevel?: string | null
    preferredWorkingStyle?: string | null
    communicationPreference?: UserCreatecommunicationPreferenceInput | string[]
    projectDescription?: string | null
    paymentPreference?: string | null
    projectFrequency?: string | null
    averageProjectDuration?: string | null
    maxHourlyRate?: string | null
    totalMonthlyBudget?: string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserCreateworkingDaysInput | string[]
    minimumProjectBudget?: string | null
    specialRequirements?: string | null
    idDocument?: string | null
    addressProof?: string | null
    taxInformation?: string | null
    phoneVerified?: boolean
    jobsPosted?: JobUncheckedCreateNestedManyWithoutClientInput
    proposals?: ProposalUncheckedCreateNestedManyWithoutFreelancerInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutAuthorInput
    receivedReviews?: ReviewUncheckedCreateNestedManyWithoutReceiverInput
    messages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput
    savedFreelancers?: SavedFreelancerUncheckedCreateNestedManyWithoutUserInput
    savedByUsers?: SavedFreelancerUncheckedCreateNestedManyWithoutFreelancerInput
  }

  export type UserCreateOrConnectWithoutNotificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
  }

  export type UserUpsertWithoutNotificationsInput = {
    update: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isOnboarded?: BoolFieldUpdateOperationsInput | boolean
    onboardingStep?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    overview?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserUpdatetopSkillsInput | string[]
    serviceOfferings?: UserUpdateserviceOfferingsInput | string[]
    hourlyRate?: NullableFloatFieldUpdateOperationsInput | number | null
    portfolio?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserUpdatecertificationsInput | string[]
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalEarnings?: NullableStringFieldUpdateOperationsInput | string | null
    successRate?: NullableIntFieldUpdateOperationsInput | number | null
    completedJobs?: NullableIntFieldUpdateOperationsInput | number | null
    onTime?: NullableIntFieldUpdateOperationsInput | number | null
    onBudget?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableStringFieldUpdateOperationsInput | string | null
    lastActive?: NullableStringFieldUpdateOperationsInput | string | null
    topRatedPlus?: BoolFieldUpdateOperationsInput | boolean
    verified?: BoolFieldUpdateOperationsInput | boolean
    risingTalent?: BoolFieldUpdateOperationsInput | boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserUpdatespecializationsInput | string[]
    memberSince?: NullableStringFieldUpdateOperationsInput | string | null
    profileStrength?: NullableIntFieldUpdateOperationsInput | number | null
    repeatHireRate?: NullableIntFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    reviewCount?: NullableIntFieldUpdateOperationsInput | number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    hourlyRateRange?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityStatus?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    companyWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    companyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    projectTypes?: UserUpdateprojectTypesInput | string[]
    preferredSkills?: UserUpdatepreferredSkillsInput | string[]
    budgetRange?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: NullableStringFieldUpdateOperationsInput | string | null
    howDidYouHear?: NullableStringFieldUpdateOperationsInput | string | null
    interestedCategories?: UserUpdateinterestedCategoriesInput | string[]
    urgencyLevel?: NullableStringFieldUpdateOperationsInput | string | null
    preferredWorkingStyle?: NullableStringFieldUpdateOperationsInput | string | null
    communicationPreference?: UserUpdatecommunicationPreferenceInput | string[]
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null
    paymentPreference?: NullableStringFieldUpdateOperationsInput | string | null
    projectFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    averageProjectDuration?: NullableStringFieldUpdateOperationsInput | string | null
    maxHourlyRate?: NullableStringFieldUpdateOperationsInput | string | null
    totalMonthlyBudget?: NullableStringFieldUpdateOperationsInput | string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserUpdateworkingDaysInput | string[]
    minimumProjectBudget?: NullableStringFieldUpdateOperationsInput | string | null
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    idDocument?: NullableStringFieldUpdateOperationsInput | string | null
    addressProof?: NullableStringFieldUpdateOperationsInput | string | null
    taxInformation?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    jobsPosted?: JobUpdateManyWithoutClientNestedInput
    proposals?: ProposalUpdateManyWithoutFreelancerNestedInput
    reviews?: ReviewUpdateManyWithoutAuthorNestedInput
    receivedReviews?: ReviewUpdateManyWithoutReceiverNestedInput
    messages?: MessageUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput
    savedFreelancers?: SavedFreelancerUpdateManyWithoutUserNestedInput
    savedByUsers?: SavedFreelancerUpdateManyWithoutFreelancerNestedInput
  }

  export type UserUncheckedUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isOnboarded?: BoolFieldUpdateOperationsInput | boolean
    onboardingStep?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    overview?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserUpdatetopSkillsInput | string[]
    serviceOfferings?: UserUpdateserviceOfferingsInput | string[]
    hourlyRate?: NullableFloatFieldUpdateOperationsInput | number | null
    portfolio?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserUpdatecertificationsInput | string[]
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalEarnings?: NullableStringFieldUpdateOperationsInput | string | null
    successRate?: NullableIntFieldUpdateOperationsInput | number | null
    completedJobs?: NullableIntFieldUpdateOperationsInput | number | null
    onTime?: NullableIntFieldUpdateOperationsInput | number | null
    onBudget?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableStringFieldUpdateOperationsInput | string | null
    lastActive?: NullableStringFieldUpdateOperationsInput | string | null
    topRatedPlus?: BoolFieldUpdateOperationsInput | boolean
    verified?: BoolFieldUpdateOperationsInput | boolean
    risingTalent?: BoolFieldUpdateOperationsInput | boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserUpdatespecializationsInput | string[]
    memberSince?: NullableStringFieldUpdateOperationsInput | string | null
    profileStrength?: NullableIntFieldUpdateOperationsInput | number | null
    repeatHireRate?: NullableIntFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    reviewCount?: NullableIntFieldUpdateOperationsInput | number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    hourlyRateRange?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityStatus?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    companyWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    companyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    projectTypes?: UserUpdateprojectTypesInput | string[]
    preferredSkills?: UserUpdatepreferredSkillsInput | string[]
    budgetRange?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: NullableStringFieldUpdateOperationsInput | string | null
    howDidYouHear?: NullableStringFieldUpdateOperationsInput | string | null
    interestedCategories?: UserUpdateinterestedCategoriesInput | string[]
    urgencyLevel?: NullableStringFieldUpdateOperationsInput | string | null
    preferredWorkingStyle?: NullableStringFieldUpdateOperationsInput | string | null
    communicationPreference?: UserUpdatecommunicationPreferenceInput | string[]
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null
    paymentPreference?: NullableStringFieldUpdateOperationsInput | string | null
    projectFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    averageProjectDuration?: NullableStringFieldUpdateOperationsInput | string | null
    maxHourlyRate?: NullableStringFieldUpdateOperationsInput | string | null
    totalMonthlyBudget?: NullableStringFieldUpdateOperationsInput | string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserUpdateworkingDaysInput | string[]
    minimumProjectBudget?: NullableStringFieldUpdateOperationsInput | string | null
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    idDocument?: NullableStringFieldUpdateOperationsInput | string | null
    addressProof?: NullableStringFieldUpdateOperationsInput | string | null
    taxInformation?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    jobsPosted?: JobUncheckedUpdateManyWithoutClientNestedInput
    proposals?: ProposalUncheckedUpdateManyWithoutFreelancerNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutAuthorNestedInput
    receivedReviews?: ReviewUncheckedUpdateManyWithoutReceiverNestedInput
    messages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
    savedFreelancers?: SavedFreelancerUncheckedUpdateManyWithoutUserNestedInput
    savedByUsers?: SavedFreelancerUncheckedUpdateManyWithoutFreelancerNestedInput
  }

  export type UserCreateWithoutSavedFreelancersInput = {
    id?: string
    googleId?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    avatar?: string | null
    bio?: string | null
    location?: string | null
    phone?: string | null
    userType?: $Enums.UserType
    isOnboarded?: boolean
    onboardingStep?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    country?: string | null
    city?: string | null
    timezone?: string | null
    title?: string | null
    overview?: string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserCreatetopSkillsInput | string[]
    serviceOfferings?: UserCreateserviceOfferingsInput | string[]
    hourlyRate?: number | null
    portfolio?: string | null
    experience?: string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserCreatecertificationsInput | string[]
    availability?: string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: string | null
    subcategory?: string | null
    experienceLevel?: string | null
    totalEarnings?: string | null
    successRate?: number | null
    completedJobs?: number | null
    onTime?: number | null
    onBudget?: number | null
    responseTime?: string | null
    lastActive?: string | null
    topRatedPlus?: boolean
    verified?: boolean
    risingTalent?: boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserCreatespecializationsInput | string[]
    memberSince?: string | null
    profileStrength?: number | null
    repeatHireRate?: number | null
    rating?: number | null
    reviewCount?: number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: string | null
    isOnline?: boolean
    hourlyRateRange?: string | null
    availabilityStatus?: string | null
    companyName?: string | null
    companySize?: string | null
    industry?: string | null
    companyWebsite?: string | null
    companyDescription?: string | null
    projectTypes?: UserCreateprojectTypesInput | string[]
    preferredSkills?: UserCreatepreferredSkillsInput | string[]
    budgetRange?: string | null
    clientType?: string | null
    howDidYouHear?: string | null
    interestedCategories?: UserCreateinterestedCategoriesInput | string[]
    urgencyLevel?: string | null
    preferredWorkingStyle?: string | null
    communicationPreference?: UserCreatecommunicationPreferenceInput | string[]
    projectDescription?: string | null
    paymentPreference?: string | null
    projectFrequency?: string | null
    averageProjectDuration?: string | null
    maxHourlyRate?: string | null
    totalMonthlyBudget?: string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserCreateworkingDaysInput | string[]
    minimumProjectBudget?: string | null
    specialRequirements?: string | null
    idDocument?: string | null
    addressProof?: string | null
    taxInformation?: string | null
    phoneVerified?: boolean
    jobsPosted?: JobCreateNestedManyWithoutClientInput
    proposals?: ProposalCreateNestedManyWithoutFreelancerInput
    reviews?: ReviewCreateNestedManyWithoutAuthorInput
    receivedReviews?: ReviewCreateNestedManyWithoutReceiverInput
    messages?: MessageCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    savedByUsers?: SavedFreelancerCreateNestedManyWithoutFreelancerInput
  }

  export type UserUncheckedCreateWithoutSavedFreelancersInput = {
    id?: string
    googleId?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    avatar?: string | null
    bio?: string | null
    location?: string | null
    phone?: string | null
    userType?: $Enums.UserType
    isOnboarded?: boolean
    onboardingStep?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    country?: string | null
    city?: string | null
    timezone?: string | null
    title?: string | null
    overview?: string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserCreatetopSkillsInput | string[]
    serviceOfferings?: UserCreateserviceOfferingsInput | string[]
    hourlyRate?: number | null
    portfolio?: string | null
    experience?: string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserCreatecertificationsInput | string[]
    availability?: string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: string | null
    subcategory?: string | null
    experienceLevel?: string | null
    totalEarnings?: string | null
    successRate?: number | null
    completedJobs?: number | null
    onTime?: number | null
    onBudget?: number | null
    responseTime?: string | null
    lastActive?: string | null
    topRatedPlus?: boolean
    verified?: boolean
    risingTalent?: boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserCreatespecializationsInput | string[]
    memberSince?: string | null
    profileStrength?: number | null
    repeatHireRate?: number | null
    rating?: number | null
    reviewCount?: number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: string | null
    isOnline?: boolean
    hourlyRateRange?: string | null
    availabilityStatus?: string | null
    companyName?: string | null
    companySize?: string | null
    industry?: string | null
    companyWebsite?: string | null
    companyDescription?: string | null
    projectTypes?: UserCreateprojectTypesInput | string[]
    preferredSkills?: UserCreatepreferredSkillsInput | string[]
    budgetRange?: string | null
    clientType?: string | null
    howDidYouHear?: string | null
    interestedCategories?: UserCreateinterestedCategoriesInput | string[]
    urgencyLevel?: string | null
    preferredWorkingStyle?: string | null
    communicationPreference?: UserCreatecommunicationPreferenceInput | string[]
    projectDescription?: string | null
    paymentPreference?: string | null
    projectFrequency?: string | null
    averageProjectDuration?: string | null
    maxHourlyRate?: string | null
    totalMonthlyBudget?: string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserCreateworkingDaysInput | string[]
    minimumProjectBudget?: string | null
    specialRequirements?: string | null
    idDocument?: string | null
    addressProof?: string | null
    taxInformation?: string | null
    phoneVerified?: boolean
    jobsPosted?: JobUncheckedCreateNestedManyWithoutClientInput
    proposals?: ProposalUncheckedCreateNestedManyWithoutFreelancerInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutAuthorInput
    receivedReviews?: ReviewUncheckedCreateNestedManyWithoutReceiverInput
    messages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    savedByUsers?: SavedFreelancerUncheckedCreateNestedManyWithoutFreelancerInput
  }

  export type UserCreateOrConnectWithoutSavedFreelancersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSavedFreelancersInput, UserUncheckedCreateWithoutSavedFreelancersInput>
  }

  export type UserCreateWithoutSavedByUsersInput = {
    id?: string
    googleId?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    avatar?: string | null
    bio?: string | null
    location?: string | null
    phone?: string | null
    userType?: $Enums.UserType
    isOnboarded?: boolean
    onboardingStep?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    country?: string | null
    city?: string | null
    timezone?: string | null
    title?: string | null
    overview?: string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserCreatetopSkillsInput | string[]
    serviceOfferings?: UserCreateserviceOfferingsInput | string[]
    hourlyRate?: number | null
    portfolio?: string | null
    experience?: string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserCreatecertificationsInput | string[]
    availability?: string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: string | null
    subcategory?: string | null
    experienceLevel?: string | null
    totalEarnings?: string | null
    successRate?: number | null
    completedJobs?: number | null
    onTime?: number | null
    onBudget?: number | null
    responseTime?: string | null
    lastActive?: string | null
    topRatedPlus?: boolean
    verified?: boolean
    risingTalent?: boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserCreatespecializationsInput | string[]
    memberSince?: string | null
    profileStrength?: number | null
    repeatHireRate?: number | null
    rating?: number | null
    reviewCount?: number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: string | null
    isOnline?: boolean
    hourlyRateRange?: string | null
    availabilityStatus?: string | null
    companyName?: string | null
    companySize?: string | null
    industry?: string | null
    companyWebsite?: string | null
    companyDescription?: string | null
    projectTypes?: UserCreateprojectTypesInput | string[]
    preferredSkills?: UserCreatepreferredSkillsInput | string[]
    budgetRange?: string | null
    clientType?: string | null
    howDidYouHear?: string | null
    interestedCategories?: UserCreateinterestedCategoriesInput | string[]
    urgencyLevel?: string | null
    preferredWorkingStyle?: string | null
    communicationPreference?: UserCreatecommunicationPreferenceInput | string[]
    projectDescription?: string | null
    paymentPreference?: string | null
    projectFrequency?: string | null
    averageProjectDuration?: string | null
    maxHourlyRate?: string | null
    totalMonthlyBudget?: string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserCreateworkingDaysInput | string[]
    minimumProjectBudget?: string | null
    specialRequirements?: string | null
    idDocument?: string | null
    addressProof?: string | null
    taxInformation?: string | null
    phoneVerified?: boolean
    jobsPosted?: JobCreateNestedManyWithoutClientInput
    proposals?: ProposalCreateNestedManyWithoutFreelancerInput
    reviews?: ReviewCreateNestedManyWithoutAuthorInput
    receivedReviews?: ReviewCreateNestedManyWithoutReceiverInput
    messages?: MessageCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    savedFreelancers?: SavedFreelancerCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSavedByUsersInput = {
    id?: string
    googleId?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    avatar?: string | null
    bio?: string | null
    location?: string | null
    phone?: string | null
    userType?: $Enums.UserType
    isOnboarded?: boolean
    onboardingStep?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    country?: string | null
    city?: string | null
    timezone?: string | null
    title?: string | null
    overview?: string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserCreatetopSkillsInput | string[]
    serviceOfferings?: UserCreateserviceOfferingsInput | string[]
    hourlyRate?: number | null
    portfolio?: string | null
    experience?: string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserCreatecertificationsInput | string[]
    availability?: string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: string | null
    subcategory?: string | null
    experienceLevel?: string | null
    totalEarnings?: string | null
    successRate?: number | null
    completedJobs?: number | null
    onTime?: number | null
    onBudget?: number | null
    responseTime?: string | null
    lastActive?: string | null
    topRatedPlus?: boolean
    verified?: boolean
    risingTalent?: boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserCreatespecializationsInput | string[]
    memberSince?: string | null
    profileStrength?: number | null
    repeatHireRate?: number | null
    rating?: number | null
    reviewCount?: number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: string | null
    isOnline?: boolean
    hourlyRateRange?: string | null
    availabilityStatus?: string | null
    companyName?: string | null
    companySize?: string | null
    industry?: string | null
    companyWebsite?: string | null
    companyDescription?: string | null
    projectTypes?: UserCreateprojectTypesInput | string[]
    preferredSkills?: UserCreatepreferredSkillsInput | string[]
    budgetRange?: string | null
    clientType?: string | null
    howDidYouHear?: string | null
    interestedCategories?: UserCreateinterestedCategoriesInput | string[]
    urgencyLevel?: string | null
    preferredWorkingStyle?: string | null
    communicationPreference?: UserCreatecommunicationPreferenceInput | string[]
    projectDescription?: string | null
    paymentPreference?: string | null
    projectFrequency?: string | null
    averageProjectDuration?: string | null
    maxHourlyRate?: string | null
    totalMonthlyBudget?: string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserCreateworkingDaysInput | string[]
    minimumProjectBudget?: string | null
    specialRequirements?: string | null
    idDocument?: string | null
    addressProof?: string | null
    taxInformation?: string | null
    phoneVerified?: boolean
    jobsPosted?: JobUncheckedCreateNestedManyWithoutClientInput
    proposals?: ProposalUncheckedCreateNestedManyWithoutFreelancerInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutAuthorInput
    receivedReviews?: ReviewUncheckedCreateNestedManyWithoutReceiverInput
    messages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    savedFreelancers?: SavedFreelancerUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSavedByUsersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSavedByUsersInput, UserUncheckedCreateWithoutSavedByUsersInput>
  }

  export type UserUpsertWithoutSavedFreelancersInput = {
    update: XOR<UserUpdateWithoutSavedFreelancersInput, UserUncheckedUpdateWithoutSavedFreelancersInput>
    create: XOR<UserCreateWithoutSavedFreelancersInput, UserUncheckedCreateWithoutSavedFreelancersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSavedFreelancersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSavedFreelancersInput, UserUncheckedUpdateWithoutSavedFreelancersInput>
  }

  export type UserUpdateWithoutSavedFreelancersInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isOnboarded?: BoolFieldUpdateOperationsInput | boolean
    onboardingStep?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    overview?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserUpdatetopSkillsInput | string[]
    serviceOfferings?: UserUpdateserviceOfferingsInput | string[]
    hourlyRate?: NullableFloatFieldUpdateOperationsInput | number | null
    portfolio?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserUpdatecertificationsInput | string[]
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalEarnings?: NullableStringFieldUpdateOperationsInput | string | null
    successRate?: NullableIntFieldUpdateOperationsInput | number | null
    completedJobs?: NullableIntFieldUpdateOperationsInput | number | null
    onTime?: NullableIntFieldUpdateOperationsInput | number | null
    onBudget?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableStringFieldUpdateOperationsInput | string | null
    lastActive?: NullableStringFieldUpdateOperationsInput | string | null
    topRatedPlus?: BoolFieldUpdateOperationsInput | boolean
    verified?: BoolFieldUpdateOperationsInput | boolean
    risingTalent?: BoolFieldUpdateOperationsInput | boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserUpdatespecializationsInput | string[]
    memberSince?: NullableStringFieldUpdateOperationsInput | string | null
    profileStrength?: NullableIntFieldUpdateOperationsInput | number | null
    repeatHireRate?: NullableIntFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    reviewCount?: NullableIntFieldUpdateOperationsInput | number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    hourlyRateRange?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityStatus?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    companyWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    companyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    projectTypes?: UserUpdateprojectTypesInput | string[]
    preferredSkills?: UserUpdatepreferredSkillsInput | string[]
    budgetRange?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: NullableStringFieldUpdateOperationsInput | string | null
    howDidYouHear?: NullableStringFieldUpdateOperationsInput | string | null
    interestedCategories?: UserUpdateinterestedCategoriesInput | string[]
    urgencyLevel?: NullableStringFieldUpdateOperationsInput | string | null
    preferredWorkingStyle?: NullableStringFieldUpdateOperationsInput | string | null
    communicationPreference?: UserUpdatecommunicationPreferenceInput | string[]
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null
    paymentPreference?: NullableStringFieldUpdateOperationsInput | string | null
    projectFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    averageProjectDuration?: NullableStringFieldUpdateOperationsInput | string | null
    maxHourlyRate?: NullableStringFieldUpdateOperationsInput | string | null
    totalMonthlyBudget?: NullableStringFieldUpdateOperationsInput | string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserUpdateworkingDaysInput | string[]
    minimumProjectBudget?: NullableStringFieldUpdateOperationsInput | string | null
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    idDocument?: NullableStringFieldUpdateOperationsInput | string | null
    addressProof?: NullableStringFieldUpdateOperationsInput | string | null
    taxInformation?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    jobsPosted?: JobUpdateManyWithoutClientNestedInput
    proposals?: ProposalUpdateManyWithoutFreelancerNestedInput
    reviews?: ReviewUpdateManyWithoutAuthorNestedInput
    receivedReviews?: ReviewUpdateManyWithoutReceiverNestedInput
    messages?: MessageUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    savedByUsers?: SavedFreelancerUpdateManyWithoutFreelancerNestedInput
  }

  export type UserUncheckedUpdateWithoutSavedFreelancersInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isOnboarded?: BoolFieldUpdateOperationsInput | boolean
    onboardingStep?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    overview?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserUpdatetopSkillsInput | string[]
    serviceOfferings?: UserUpdateserviceOfferingsInput | string[]
    hourlyRate?: NullableFloatFieldUpdateOperationsInput | number | null
    portfolio?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserUpdatecertificationsInput | string[]
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalEarnings?: NullableStringFieldUpdateOperationsInput | string | null
    successRate?: NullableIntFieldUpdateOperationsInput | number | null
    completedJobs?: NullableIntFieldUpdateOperationsInput | number | null
    onTime?: NullableIntFieldUpdateOperationsInput | number | null
    onBudget?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableStringFieldUpdateOperationsInput | string | null
    lastActive?: NullableStringFieldUpdateOperationsInput | string | null
    topRatedPlus?: BoolFieldUpdateOperationsInput | boolean
    verified?: BoolFieldUpdateOperationsInput | boolean
    risingTalent?: BoolFieldUpdateOperationsInput | boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserUpdatespecializationsInput | string[]
    memberSince?: NullableStringFieldUpdateOperationsInput | string | null
    profileStrength?: NullableIntFieldUpdateOperationsInput | number | null
    repeatHireRate?: NullableIntFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    reviewCount?: NullableIntFieldUpdateOperationsInput | number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    hourlyRateRange?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityStatus?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    companyWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    companyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    projectTypes?: UserUpdateprojectTypesInput | string[]
    preferredSkills?: UserUpdatepreferredSkillsInput | string[]
    budgetRange?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: NullableStringFieldUpdateOperationsInput | string | null
    howDidYouHear?: NullableStringFieldUpdateOperationsInput | string | null
    interestedCategories?: UserUpdateinterestedCategoriesInput | string[]
    urgencyLevel?: NullableStringFieldUpdateOperationsInput | string | null
    preferredWorkingStyle?: NullableStringFieldUpdateOperationsInput | string | null
    communicationPreference?: UserUpdatecommunicationPreferenceInput | string[]
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null
    paymentPreference?: NullableStringFieldUpdateOperationsInput | string | null
    projectFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    averageProjectDuration?: NullableStringFieldUpdateOperationsInput | string | null
    maxHourlyRate?: NullableStringFieldUpdateOperationsInput | string | null
    totalMonthlyBudget?: NullableStringFieldUpdateOperationsInput | string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserUpdateworkingDaysInput | string[]
    minimumProjectBudget?: NullableStringFieldUpdateOperationsInput | string | null
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    idDocument?: NullableStringFieldUpdateOperationsInput | string | null
    addressProof?: NullableStringFieldUpdateOperationsInput | string | null
    taxInformation?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    jobsPosted?: JobUncheckedUpdateManyWithoutClientNestedInput
    proposals?: ProposalUncheckedUpdateManyWithoutFreelancerNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutAuthorNestedInput
    receivedReviews?: ReviewUncheckedUpdateManyWithoutReceiverNestedInput
    messages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    savedByUsers?: SavedFreelancerUncheckedUpdateManyWithoutFreelancerNestedInput
  }

  export type UserUpsertWithoutSavedByUsersInput = {
    update: XOR<UserUpdateWithoutSavedByUsersInput, UserUncheckedUpdateWithoutSavedByUsersInput>
    create: XOR<UserCreateWithoutSavedByUsersInput, UserUncheckedCreateWithoutSavedByUsersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSavedByUsersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSavedByUsersInput, UserUncheckedUpdateWithoutSavedByUsersInput>
  }

  export type UserUpdateWithoutSavedByUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isOnboarded?: BoolFieldUpdateOperationsInput | boolean
    onboardingStep?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    overview?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserUpdatetopSkillsInput | string[]
    serviceOfferings?: UserUpdateserviceOfferingsInput | string[]
    hourlyRate?: NullableFloatFieldUpdateOperationsInput | number | null
    portfolio?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserUpdatecertificationsInput | string[]
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalEarnings?: NullableStringFieldUpdateOperationsInput | string | null
    successRate?: NullableIntFieldUpdateOperationsInput | number | null
    completedJobs?: NullableIntFieldUpdateOperationsInput | number | null
    onTime?: NullableIntFieldUpdateOperationsInput | number | null
    onBudget?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableStringFieldUpdateOperationsInput | string | null
    lastActive?: NullableStringFieldUpdateOperationsInput | string | null
    topRatedPlus?: BoolFieldUpdateOperationsInput | boolean
    verified?: BoolFieldUpdateOperationsInput | boolean
    risingTalent?: BoolFieldUpdateOperationsInput | boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserUpdatespecializationsInput | string[]
    memberSince?: NullableStringFieldUpdateOperationsInput | string | null
    profileStrength?: NullableIntFieldUpdateOperationsInput | number | null
    repeatHireRate?: NullableIntFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    reviewCount?: NullableIntFieldUpdateOperationsInput | number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    hourlyRateRange?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityStatus?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    companyWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    companyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    projectTypes?: UserUpdateprojectTypesInput | string[]
    preferredSkills?: UserUpdatepreferredSkillsInput | string[]
    budgetRange?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: NullableStringFieldUpdateOperationsInput | string | null
    howDidYouHear?: NullableStringFieldUpdateOperationsInput | string | null
    interestedCategories?: UserUpdateinterestedCategoriesInput | string[]
    urgencyLevel?: NullableStringFieldUpdateOperationsInput | string | null
    preferredWorkingStyle?: NullableStringFieldUpdateOperationsInput | string | null
    communicationPreference?: UserUpdatecommunicationPreferenceInput | string[]
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null
    paymentPreference?: NullableStringFieldUpdateOperationsInput | string | null
    projectFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    averageProjectDuration?: NullableStringFieldUpdateOperationsInput | string | null
    maxHourlyRate?: NullableStringFieldUpdateOperationsInput | string | null
    totalMonthlyBudget?: NullableStringFieldUpdateOperationsInput | string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserUpdateworkingDaysInput | string[]
    minimumProjectBudget?: NullableStringFieldUpdateOperationsInput | string | null
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    idDocument?: NullableStringFieldUpdateOperationsInput | string | null
    addressProof?: NullableStringFieldUpdateOperationsInput | string | null
    taxInformation?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    jobsPosted?: JobUpdateManyWithoutClientNestedInput
    proposals?: ProposalUpdateManyWithoutFreelancerNestedInput
    reviews?: ReviewUpdateManyWithoutAuthorNestedInput
    receivedReviews?: ReviewUpdateManyWithoutReceiverNestedInput
    messages?: MessageUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    savedFreelancers?: SavedFreelancerUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSavedByUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isOnboarded?: BoolFieldUpdateOperationsInput | boolean
    onboardingStep?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    overview?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    topSkills?: UserUpdatetopSkillsInput | string[]
    serviceOfferings?: UserUpdateserviceOfferingsInput | string[]
    hourlyRate?: NullableFloatFieldUpdateOperationsInput | number | null
    portfolio?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    certifications?: UserUpdatecertificationsInput | string[]
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    languages?: NullableJsonNullValueInput | InputJsonValue
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalEarnings?: NullableStringFieldUpdateOperationsInput | string | null
    successRate?: NullableIntFieldUpdateOperationsInput | number | null
    completedJobs?: NullableIntFieldUpdateOperationsInput | number | null
    onTime?: NullableIntFieldUpdateOperationsInput | number | null
    onBudget?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableStringFieldUpdateOperationsInput | string | null
    lastActive?: NullableStringFieldUpdateOperationsInput | string | null
    topRatedPlus?: BoolFieldUpdateOperationsInput | boolean
    verified?: BoolFieldUpdateOperationsInput | boolean
    risingTalent?: BoolFieldUpdateOperationsInput | boolean
    portfolioItems?: NullableJsonNullValueInput | InputJsonValue
    testScores?: NullableJsonNullValueInput | InputJsonValue
    specializations?: UserUpdatespecializationsInput | string[]
    memberSince?: NullableStringFieldUpdateOperationsInput | string | null
    profileStrength?: NullableIntFieldUpdateOperationsInput | number | null
    repeatHireRate?: NullableIntFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    reviewCount?: NullableIntFieldUpdateOperationsInput | number | null
    portfolioProjects?: NullableJsonNullValueInput | InputJsonValue
    workHistory?: NullableJsonNullValueInput | InputJsonValue
    employmentHistory?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    hourlyRateRange?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityStatus?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    companyWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    companyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    projectTypes?: UserUpdateprojectTypesInput | string[]
    preferredSkills?: UserUpdatepreferredSkillsInput | string[]
    budgetRange?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: NullableStringFieldUpdateOperationsInput | string | null
    howDidYouHear?: NullableStringFieldUpdateOperationsInput | string | null
    interestedCategories?: UserUpdateinterestedCategoriesInput | string[]
    urgencyLevel?: NullableStringFieldUpdateOperationsInput | string | null
    preferredWorkingStyle?: NullableStringFieldUpdateOperationsInput | string | null
    communicationPreference?: UserUpdatecommunicationPreferenceInput | string[]
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null
    paymentPreference?: NullableStringFieldUpdateOperationsInput | string | null
    projectFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    averageProjectDuration?: NullableStringFieldUpdateOperationsInput | string | null
    maxHourlyRate?: NullableStringFieldUpdateOperationsInput | string | null
    totalMonthlyBudget?: NullableStringFieldUpdateOperationsInput | string | null
    projectBasedRates?: NullableJsonNullValueInput | InputJsonValue
    hoursPerWeek?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    workingDays?: UserUpdateworkingDaysInput | string[]
    minimumProjectBudget?: NullableStringFieldUpdateOperationsInput | string | null
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    idDocument?: NullableStringFieldUpdateOperationsInput | string | null
    addressProof?: NullableStringFieldUpdateOperationsInput | string | null
    taxInformation?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    jobsPosted?: JobUncheckedUpdateManyWithoutClientNestedInput
    proposals?: ProposalUncheckedUpdateManyWithoutFreelancerNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutAuthorNestedInput
    receivedReviews?: ReviewUncheckedUpdateManyWithoutReceiverNestedInput
    messages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    savedFreelancers?: SavedFreelancerUncheckedUpdateManyWithoutUserNestedInput
  }

  export type JobCreateManyClientInput = {
    id?: string
    title: string
    description: string
    requirements?: JobCreaterequirementsInput | string[]
    budget: $Enums.BudgetType
    minBudget?: number | null
    maxBudget?: number | null
    hourlyRate?: number | null
    duration?: string | null
    skills?: JobCreateskillsInput | string[]
    category: string
    subcategory?: string | null
    projectType?: string | null
    experienceLevel?: string | null
    workingHours?: string | null
    timezone?: string | null
    communicationPreferences?: JobCreatecommunicationPreferencesInput | string[]
    location?: string | null
    isRemote?: boolean
    status?: $Enums.JobStatus
    isUrgent?: boolean
    visibility?: string
    applicationDeadline?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProposalCreateManyFreelancerInput = {
    id?: string
    coverLetter: string
    bidAmount: number
    estimatedDuration: string
    attachments?: ProposalCreateattachmentsInput | string[]
    status?: $Enums.ProposalStatus
    jobId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    questionResponses?: NullableJsonNullValueInput | InputJsonValue
    milestones?: NullableJsonNullValueInput | InputJsonValue
    clientNotes?: string | null
    clientViewed?: boolean
    rating?: number | null
    interview?: NullableJsonNullValueInput | InputJsonValue
    originalBudget?: number | null
    isShortlisted?: boolean
  }

  export type ReviewCreateManyAuthorInput = {
    id?: string
    rating: number
    comment: string
    receiverId: string
    jobId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewCreateManyReceiverInput = {
    id?: string
    rating: number
    comment: string
    authorId: string
    jobId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageCreateManySenderInput = {
    id?: string
    content: string
    receiverEmail: string
    conversationId: string
    isRead?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageCreateManyReceiverInput = {
    id?: string
    content: string
    senderEmail: string
    conversationId: string
    isRead?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationCreateManyUserInput = {
    id?: string
    title: string
    message: string
    type: $Enums.NotificationType
    isRead?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SavedFreelancerCreateManyUserInput = {
    id?: string
    freelancerId: string
    createdAt?: Date | string
  }

  export type SavedFreelancerCreateManyFreelancerInput = {
    id?: string
    userId: string
    createdAt?: Date | string
  }

  export type JobUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    requirements?: JobUpdaterequirementsInput | string[]
    budget?: EnumBudgetTypeFieldUpdateOperationsInput | $Enums.BudgetType
    minBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    maxBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    hourlyRate?: NullableFloatFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: JobUpdateskillsInput | string[]
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    projectType?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    communicationPreferences?: JobUpdatecommunicationPreferencesInput | string[]
    location?: NullableStringFieldUpdateOperationsInput | string | null
    isRemote?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    isUrgent?: BoolFieldUpdateOperationsInput | boolean
    visibility?: StringFieldUpdateOperationsInput | string
    applicationDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation?: ConversationUpdateManyWithoutJobNestedInput
    proposals?: ProposalUpdateManyWithoutJobNestedInput
    reviews?: ReviewUpdateManyWithoutJobNestedInput
  }

  export type JobUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    requirements?: JobUpdaterequirementsInput | string[]
    budget?: EnumBudgetTypeFieldUpdateOperationsInput | $Enums.BudgetType
    minBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    maxBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    hourlyRate?: NullableFloatFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: JobUpdateskillsInput | string[]
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    projectType?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    communicationPreferences?: JobUpdatecommunicationPreferencesInput | string[]
    location?: NullableStringFieldUpdateOperationsInput | string | null
    isRemote?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    isUrgent?: BoolFieldUpdateOperationsInput | boolean
    visibility?: StringFieldUpdateOperationsInput | string
    applicationDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation?: ConversationUncheckedUpdateManyWithoutJobNestedInput
    proposals?: ProposalUncheckedUpdateManyWithoutJobNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutJobNestedInput
  }

  export type JobUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    requirements?: JobUpdaterequirementsInput | string[]
    budget?: EnumBudgetTypeFieldUpdateOperationsInput | $Enums.BudgetType
    minBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    maxBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    hourlyRate?: NullableFloatFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: JobUpdateskillsInput | string[]
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    projectType?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    communicationPreferences?: JobUpdatecommunicationPreferencesInput | string[]
    location?: NullableStringFieldUpdateOperationsInput | string | null
    isRemote?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    isUrgent?: BoolFieldUpdateOperationsInput | boolean
    visibility?: StringFieldUpdateOperationsInput | string
    applicationDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProposalUpdateWithoutFreelancerInput = {
    id?: StringFieldUpdateOperationsInput | string
    coverLetter?: StringFieldUpdateOperationsInput | string
    bidAmount?: FloatFieldUpdateOperationsInput | number
    estimatedDuration?: StringFieldUpdateOperationsInput | string
    attachments?: ProposalUpdateattachmentsInput | string[]
    status?: EnumProposalStatusFieldUpdateOperationsInput | $Enums.ProposalStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questionResponses?: NullableJsonNullValueInput | InputJsonValue
    milestones?: NullableJsonNullValueInput | InputJsonValue
    clientNotes?: NullableStringFieldUpdateOperationsInput | string | null
    clientViewed?: BoolFieldUpdateOperationsInput | boolean
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    interview?: NullableJsonNullValueInput | InputJsonValue
    originalBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    isShortlisted?: BoolFieldUpdateOperationsInput | boolean
    job?: JobUpdateOneRequiredWithoutProposalsNestedInput
  }

  export type ProposalUncheckedUpdateWithoutFreelancerInput = {
    id?: StringFieldUpdateOperationsInput | string
    coverLetter?: StringFieldUpdateOperationsInput | string
    bidAmount?: FloatFieldUpdateOperationsInput | number
    estimatedDuration?: StringFieldUpdateOperationsInput | string
    attachments?: ProposalUpdateattachmentsInput | string[]
    status?: EnumProposalStatusFieldUpdateOperationsInput | $Enums.ProposalStatus
    jobId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questionResponses?: NullableJsonNullValueInput | InputJsonValue
    milestones?: NullableJsonNullValueInput | InputJsonValue
    clientNotes?: NullableStringFieldUpdateOperationsInput | string | null
    clientViewed?: BoolFieldUpdateOperationsInput | boolean
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    interview?: NullableJsonNullValueInput | InputJsonValue
    originalBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    isShortlisted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProposalUncheckedUpdateManyWithoutFreelancerInput = {
    id?: StringFieldUpdateOperationsInput | string
    coverLetter?: StringFieldUpdateOperationsInput | string
    bidAmount?: FloatFieldUpdateOperationsInput | number
    estimatedDuration?: StringFieldUpdateOperationsInput | string
    attachments?: ProposalUpdateattachmentsInput | string[]
    status?: EnumProposalStatusFieldUpdateOperationsInput | $Enums.ProposalStatus
    jobId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questionResponses?: NullableJsonNullValueInput | InputJsonValue
    milestones?: NullableJsonNullValueInput | InputJsonValue
    clientNotes?: NullableStringFieldUpdateOperationsInput | string | null
    clientViewed?: BoolFieldUpdateOperationsInput | boolean
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    interview?: NullableJsonNullValueInput | InputJsonValue
    originalBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    isShortlisted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ReviewUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receiver?: UserUpdateOneRequiredWithoutReceivedReviewsNestedInput
    job?: JobUpdateOneWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    jobId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    jobId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUpdateWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutReviewsNestedInput
    job?: JobUpdateOneWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    jobId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    jobId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receiver?: UserUpdateOneRequiredWithoutReceivedMessagesNestedInput
    conversation?: ConversationUpdateOneRequiredWithoutMessagesNestedInput
    conversationAsLastMessage?: ConversationUpdateManyWithoutLastMessageNestedInput
  }

  export type MessageUncheckedUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    receiverEmail?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversationAsLastMessage?: ConversationUncheckedUpdateManyWithoutLastMessageNestedInput
  }

  export type MessageUncheckedUpdateManyWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    receiverEmail?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUpdateWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: UserUpdateOneRequiredWithoutMessagesNestedInput
    conversation?: ConversationUpdateOneRequiredWithoutMessagesNestedInput
    conversationAsLastMessage?: ConversationUpdateManyWithoutLastMessageNestedInput
  }

  export type MessageUncheckedUpdateWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    senderEmail?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversationAsLastMessage?: ConversationUncheckedUpdateManyWithoutLastMessageNestedInput
  }

  export type MessageUncheckedUpdateManyWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    senderEmail?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedFreelancerUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    freelancer?: UserUpdateOneRequiredWithoutSavedByUsersNestedInput
  }

  export type SavedFreelancerUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    freelancerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedFreelancerUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    freelancerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedFreelancerUpdateWithoutFreelancerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSavedFreelancersNestedInput
  }

  export type SavedFreelancerUncheckedUpdateWithoutFreelancerInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedFreelancerUncheckedUpdateManyWithoutFreelancerInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationCreateManyJobInput = {
    id?: string
    participants?: ConversationCreateparticipantsInput | string[]
    projectName?: string | null
    isActive?: boolean
    lastMessageId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProposalCreateManyJobInput = {
    id?: string
    coverLetter: string
    bidAmount: number
    estimatedDuration: string
    attachments?: ProposalCreateattachmentsInput | string[]
    status?: $Enums.ProposalStatus
    freelancerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    questionResponses?: NullableJsonNullValueInput | InputJsonValue
    milestones?: NullableJsonNullValueInput | InputJsonValue
    clientNotes?: string | null
    clientViewed?: boolean
    rating?: number | null
    interview?: NullableJsonNullValueInput | InputJsonValue
    originalBudget?: number | null
    isShortlisted?: boolean
  }

  export type ReviewCreateManyJobInput = {
    id?: string
    rating: number
    comment: string
    authorId: string
    receiverId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConversationUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    participants?: ConversationUpdateparticipantsInput | string[]
    projectName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUpdateManyWithoutConversationNestedInput
    lastMessage?: MessageUpdateOneWithoutConversationAsLastMessageNestedInput
  }

  export type ConversationUncheckedUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    participants?: ConversationUpdateparticipantsInput | string[]
    projectName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateManyWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    participants?: ConversationUpdateparticipantsInput | string[]
    projectName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProposalUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    coverLetter?: StringFieldUpdateOperationsInput | string
    bidAmount?: FloatFieldUpdateOperationsInput | number
    estimatedDuration?: StringFieldUpdateOperationsInput | string
    attachments?: ProposalUpdateattachmentsInput | string[]
    status?: EnumProposalStatusFieldUpdateOperationsInput | $Enums.ProposalStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questionResponses?: NullableJsonNullValueInput | InputJsonValue
    milestones?: NullableJsonNullValueInput | InputJsonValue
    clientNotes?: NullableStringFieldUpdateOperationsInput | string | null
    clientViewed?: BoolFieldUpdateOperationsInput | boolean
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    interview?: NullableJsonNullValueInput | InputJsonValue
    originalBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    isShortlisted?: BoolFieldUpdateOperationsInput | boolean
    freelancer?: UserUpdateOneRequiredWithoutProposalsNestedInput
  }

  export type ProposalUncheckedUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    coverLetter?: StringFieldUpdateOperationsInput | string
    bidAmount?: FloatFieldUpdateOperationsInput | number
    estimatedDuration?: StringFieldUpdateOperationsInput | string
    attachments?: ProposalUpdateattachmentsInput | string[]
    status?: EnumProposalStatusFieldUpdateOperationsInput | $Enums.ProposalStatus
    freelancerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questionResponses?: NullableJsonNullValueInput | InputJsonValue
    milestones?: NullableJsonNullValueInput | InputJsonValue
    clientNotes?: NullableStringFieldUpdateOperationsInput | string | null
    clientViewed?: BoolFieldUpdateOperationsInput | boolean
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    interview?: NullableJsonNullValueInput | InputJsonValue
    originalBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    isShortlisted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProposalUncheckedUpdateManyWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    coverLetter?: StringFieldUpdateOperationsInput | string
    bidAmount?: FloatFieldUpdateOperationsInput | number
    estimatedDuration?: StringFieldUpdateOperationsInput | string
    attachments?: ProposalUpdateattachmentsInput | string[]
    status?: EnumProposalStatusFieldUpdateOperationsInput | $Enums.ProposalStatus
    freelancerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questionResponses?: NullableJsonNullValueInput | InputJsonValue
    milestones?: NullableJsonNullValueInput | InputJsonValue
    clientNotes?: NullableStringFieldUpdateOperationsInput | string | null
    clientViewed?: BoolFieldUpdateOperationsInput | boolean
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    interview?: NullableJsonNullValueInput | InputJsonValue
    originalBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    isShortlisted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ReviewUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutReviewsNestedInput
    receiver?: UserUpdateOneRequiredWithoutReceivedReviewsNestedInput
  }

  export type ReviewUncheckedUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateManyConversationInput = {
    id?: string
    content: string
    senderEmail: string
    receiverEmail: string
    isRead?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: UserUpdateOneRequiredWithoutMessagesNestedInput
    receiver?: UserUpdateOneRequiredWithoutReceivedMessagesNestedInput
    conversationAsLastMessage?: ConversationUpdateManyWithoutLastMessageNestedInput
  }

  export type MessageUncheckedUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    senderEmail?: StringFieldUpdateOperationsInput | string
    receiverEmail?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversationAsLastMessage?: ConversationUncheckedUpdateManyWithoutLastMessageNestedInput
  }

  export type MessageUncheckedUpdateManyWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    senderEmail?: StringFieldUpdateOperationsInput | string
    receiverEmail?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationCreateManyLastMessageInput = {
    id?: string
    participants?: ConversationCreateparticipantsInput | string[]
    jobId?: string | null
    projectName?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConversationUpdateWithoutLastMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    participants?: ConversationUpdateparticipantsInput | string[]
    projectName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    job?: JobUpdateOneWithoutConversationNestedInput
    messages?: MessageUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateWithoutLastMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    participants?: ConversationUpdateparticipantsInput | string[]
    jobId?: NullableStringFieldUpdateOperationsInput | string | null
    projectName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateManyWithoutLastMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    participants?: ConversationUpdateparticipantsInput | string[]
    jobId?: NullableStringFieldUpdateOperationsInput | string | null
    projectName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}