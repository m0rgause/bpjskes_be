-- Adminer 4.8.1 PostgreSQL 15.1 (Ubuntu 15.1-1.pgdg20.04+1) dump

DROP TABLE IF EXISTS "aut_access";
CREATE TABLE "aut_access" (
    "id" uniqueidentifier DEFAULT NEWID() NOT NULL,
    "pid" varchar(36),
    "nama" varchar(50) NOT NULL,
    "path" varchar(50) NOT NULL,
    "icon" varchar(25),
    "urutan" varchar NOT NULL,
    "urutan_path" varchar(25) NOT NULL,
    CONSTRAINT "aut_access_pkey" PRIMARY KEY ("id")
)

INSERT INTO "aut_access" ("id", "pid", "nama", "path", "icon", "urutan", "urutan_path") VALUES
('9cb87d3d-4a7b-4ad4-8b11-c326e08ec374',	'1d3881de-29d1-4e97-a9fb-fd7aa058d974',	'Access',	'/setting/access/list',	'<KeyOutlined />',	'3',	'3-3'),
('f46069ec-5c97-4e3c-9710-5bb026c0a6aa',	'1d3881de-29d1-4e97-a9fb-fd7aa058d974',	'Group',	'/setting/group/list',	'TeamOutlined',	'2',	'3-2'),
('dc837767-d4c5-4156-8f19-4c291c0614e4',	'1d3881de-29d1-4e97-a9fb-fd7aa058d974',	'User',	'/setting/user/list',	'<UserOutlined />',	'1',	'3-1'),
('1d3881de-29d1-4e97-a9fb-fd7aa058d974',	NULL,	'User Access',	'/useraccess',	'<SettingOutlined />',	'3',	'3'),
('c2023bc0-a2ca-4b74-aa04-9cfe73d7c9a4',	'aeb02550-5e55-45f2-98e2-f9e07d40bfc9',	'External Cash',	'/twrr/external_cash',	'BarChartOutlined',	'1',	'1-1'),
('3c1db6d7-83b7-4e82-b3f2-5a15c0e8af48',	'aeb02550-5e55-45f2-98e2-f9e07d40bfc9',	'Comparison',	'/twrr/comparison',	'BoxPlotOutlined',	'2',	'1-2'),
('0799faed-1ff8-4962-867b-5ad874d56506',	'aeb02550-5e55-45f2-98e2-f9e07d40bfc9',	'Detail',	'/twrr/detail',	'FileSyncOutlined',	'3',	'1-3'),
('84622788-51a7-431c-bdee-b700f34360f1',	'36ec096b-615d-49e4-b789-7764736cee00',	'Summary',	'/ckpn/summary',	'PieChartOutlined',	'1',	'2-1'),
('604d5f8c-6f69-4223-9013-e23d72e97b4c',	'36ec096b-615d-49e4-b789-7764736cee00',	'Deposito',	'/ckpn/deposito',	'EuroCircleOutlined',	'2',	'2-2'),
('9384d4b6-c0d8-455e-bc65-3c221af879ce',	'36ec096b-615d-49e4-b789-7764736cee00',	'Obligasi',	'/ckpn/obligasi',	'CreditCardOutlined',	'3',	'2-3'),
('41c539fb-5742-4f01-85dc-fd1c1b8e27e0',	'36ec096b-615d-49e4-b789-7764736cee00',	'Comparison',	'/ckpn/comparison',	'BoxPlotOutlined',	'4',	'2-4'),
('c81a05b1-e57f-4855-ae16-8cd64f42bddf',	'36ec096b-615d-49e4-b789-7764736cee00',	'Detail',	'/ckpn/detail',	'FileSyncOutlined',	'5',	'2-5'),
('05582b50-bff4-4280-86fc-382f010966fb',	'c5275e47-6666-4478-accd-0880a5998432',	'Summary',	'/porto/summary',	'PieChartOutlined',	'1',	'4-1'),
('ae38f672-96b4-4118-8bc0-89da4f42431e',	'c5275e47-6666-4478-accd-0880a5998432',	'Deposito',	'/porto/deposito',	'EuroCircleOutlined',	'2',	'4-2'),
('f7136ed8-8eb0-42d4-8c0a-bc3fa98a9bd8',	'c5275e47-6666-4478-accd-0880a5998432',	'SBN',	'/porto/sbn',	'FileOutlined',	'3',	'4-3'),
('82dbc729-165e-4b73-ba9b-04f4460c9d58',	'c5275e47-6666-4478-accd-0880a5998432',	'Obligasi',	'/porto/obligasi',	'CreditCardOutlined',	'4',	'4-4'),
('ec2ccd0c-1691-4a2e-85bb-bee6d58a8214',	'c5275e47-6666-4478-accd-0880a5998432',	'SBI',	'/porto/sbi',	'SolutionOutlined',	'5',	'4-5'),
('4fa6fbea-cdde-473f-8dc5-c1f2c86020f1',	'c5275e47-6666-4478-accd-0880a5998432',	'Comparison',	'/porto/comparison',	'BoxPlotOutlined',	'6',	'4-6'),
('b22d06a6-d3ff-4b20-890c-e993bbac8428',	NULL,	'Setting',	'/setting',	'UserSwitchOutlined',	'5',	'5'),
('c7e7c8fc-7401-4839-a0b3-f1bd8d850c3f',	'b22d06a6-d3ff-4b20-890c-e993bbac8428',	'TWRR COA',	'/setting/twrr_coa',	'AreaChartOutlined',	'1',	'5-1'),
('83fa8c2f-83d5-4df4-b86a-7f5f3004d50d',	'b22d06a6-d3ff-4b20-890c-e993bbac8428',	'Bank Setting',	'/setting/bank',	'BankOutlined',	'2',	'5-2'),
('aeb02550-5e55-45f2-98e2-f9e07d40bfc9',	NULL,	'TWRR',	'/twrr',	'DashboardOutlined',	'1',	'1'),
('36ec096b-615d-49e4-b789-7764736cee00',	NULL,	'CKPN',	'/ckpn',	'PicCenterOutlined',	'2',	'2'),
('c5275e47-6666-4478-accd-0880a5998432',	NULL,	'Porto',	'/porto',	'WalletOutlined',	'4',	'4'),
('c3334e41-fd56-40b9-9249-9d752d7597ab',	NULL,	'Upload Data',	'#',	'UpCircleOutlined',	'6',	'6'),
('11199035-ae6b-4fd2-bbef-64e0c0e4bb77',	'c3334e41-fd56-40b9-9249-9d752d7597ab',	'TWRR',	'/upload/twrr',	'DashboardOutlined',	'1',	'6-1'),
('41d50ad9-ddcf-413a-a101-96138721e888',	'c3334e41-fd56-40b9-9249-9d752d7597ab',	'Porto',	'/upload/porto',	'WalletOutlined',	'2',	'6-2');

DROP TABLE IF EXISTS "aut_group";
CREATE TABLE "aut_group" (
    "id" uniqueidentifier DEFAULT NEWID() NOT NULL,
    "nama" varchar(50) NOT NULL,
    "landing" varchar(50) NOT NULL,
    "access_list" NVARCHAR(MAX),
    CONSTRAINT "aut_group_nama_key" UNIQUE ("nama"),
    CONSTRAINT "aut_group_pkey" PRIMARY KEY ("id")
);

INSERT INTO "aut_group" ("id", "nama", "landing", "access_list") VALUES
('001a61ec-af92-408c-8520-9c99eeff6219',	'BPJS',	'/twrr/external_cash',	'[{"key":"/twrr","label":"TWRR","icon":"DashboardOutlined","urutan":"1","children":[{"key":"/twrr/external_cash","label":"External Cash","icon":"BarChartOutlined","urutan":"1"},{"key":"/twrr/comparison","label":"Comparison","icon":"BoxPlotOutlined","urutan":"2"},{"key":"/twrr/detail","label":"Detail","icon":"FileSyncOutlined","urutan":"3"}]},{"key":"/ckpn","label":"CKPN","icon":"PicCenterOutlined","urutan":"2","children":[{"key":"/ckpn/summary","label":"Summary","icon":"PieChartOutlined","urutan":"1"},{"key":"/ckpn/deposito","label":"Deposito","icon":"EuroCircleOutlined","urutan":"2"},{"key":"/ckpn/obligasi","label":"Obligasi","icon":"CreditCardOutlined","urutan":"3"},{"key":"/ckpn/comparison","label":"Comparison","icon":"BoxPlotOutlined","urutan":"4"},{"key":"/ckpn/detail","label":"Detail","icon":"FileSyncOutlined","urutan":"5"}]},{"key":"/porto","label":"Porto","icon":"WalletOutlined","urutan":"4","children":[{"key":"/porto/summary","label":"Summary","icon":"PieChartOutlined","urutan":"1"},{"key":"/porto/deposito","label":"Deposito","icon":"EuroCircleOutlined","urutan":"2"},{"key":"/porto/sbn","label":"SBN","icon":"FileOutlined","urutan":"3"},{"key":"/porto/obligasi","label":"Obligasi","icon":"CreditCardOutlined","urutan":"4"},{"key":"/porto/sbi","label":"SBI","icon":"SolutionOutlined","urutan":"5"},{"key":"/porto/comparison","label":"Comparison","icon":"BoxPlotOutlined","urutan":"6"}]}]'),
('3ce275f5-3e8a-4a64-a30f-13077c58ac6d',	'Admin',	'/setting/user/list',	'[{"key":"/useraccess","label":"User Access","icon":"<SettingOutlined />","urutan":"3","children":[{"key":"/setting/user/list","label":"User","icon":"<UserOutlined />","urutan":"1"},{"key":"/setting/group/list","label":"Group","icon":"TeamOutlined","urutan":"2"},{"key":"/setting/access/list","label":"Access","icon":"<KeyOutlined />","urutan":"3"}]},{"key":"/setting","label":"Setting","icon":"UserSwitchOutlined","urutan":"5","children":[{"key":"/setting/twrr_coa","label":"TWRR COA","icon":"AreaChartOutlined","urutan":"1"},{"key":"/setting/bank","label":"Bank Setting","icon":"BankOutlined","urutan":"2"}]},{"key":"#","label":"Upload Data","icon":"UpCircleOutlined","urutan":"6","children":[{"key":"/upload/twrr","label":"TWRR","icon":"DashboardOutlined","urutan":"1"},{"key":"/upload/porto","label":"Porto","icon":"WalletOutlined","urutan":"2"}]}]');

DROP TABLE IF EXISTS "aut_group_access";
CREATE TABLE "aut_group_access" (
    "id" uniqueidentifier DEFAULT NEWID() NOT NULL,
    "aut_group_id" uniqueidentifier NOT NULL,
    "aut_access_id" uniqueidentifier NOT NULL,
    CONSTRAINT "aut_group_access_pkey" PRIMARY KEY ("id")
);

INSERT INTO "aut_group_access" ("id", "aut_group_id", "aut_access_id") VALUES
('76b1653a-872f-4273-b527-b35015b71c9b',	'001a61ec-af92-408c-8520-9c99eeff6219',	'c2023bc0-a2ca-4b74-aa04-9cfe73d7c9a4'),
('1f9d303f-1e46-4bd5-a502-d9865be29a9c',	'001a61ec-af92-408c-8520-9c99eeff6219',	'3c1db6d7-83b7-4e82-b3f2-5a15c0e8af48'),
('aa65fc79-a4fb-4d4c-a352-2a7776f21338',	'001a61ec-af92-408c-8520-9c99eeff6219',	'84622788-51a7-431c-bdee-b700f34360f1'),
('e3a9e068-de04-4c48-b289-ecbd31082a4f',	'001a61ec-af92-408c-8520-9c99eeff6219',	'0799faed-1ff8-4962-867b-5ad874d56506'),
('7d203322-6ac1-416a-8852-2df30ed1dde3',	'001a61ec-af92-408c-8520-9c99eeff6219',	'604d5f8c-6f69-4223-9013-e23d72e97b4c'),
('962c4638-b85f-4588-9751-83f34ccc182a',	'001a61ec-af92-408c-8520-9c99eeff6219',	'9384d4b6-c0d8-455e-bc65-3c221af879ce'),
('15fbde8b-4db2-45ae-a882-758d5d7ac67e',	'001a61ec-af92-408c-8520-9c99eeff6219',	'41c539fb-5742-4f01-85dc-fd1c1b8e27e0'),
('503101dd-40ee-4fb7-b65b-e6e412c058c2',	'001a61ec-af92-408c-8520-9c99eeff6219',	'c81a05b1-e57f-4855-ae16-8cd64f42bddf'),
('5aeac43b-5483-4672-b0ac-80827caf28f1',	'001a61ec-af92-408c-8520-9c99eeff6219',	'05582b50-bff4-4280-86fc-382f010966fb'),
('9dcef288-d1fd-4ce6-a0db-4d54a965cf9e',	'001a61ec-af92-408c-8520-9c99eeff6219',	'ae38f672-96b4-4118-8bc0-89da4f42431e'),
('8fc52fa3-bb25-4926-b3e7-f6d8cf93d632',	'001a61ec-af92-408c-8520-9c99eeff6219',	'f7136ed8-8eb0-42d4-8c0a-bc3fa98a9bd8'),
('7ae381c0-77d4-489a-b013-2545e0fe341a',	'001a61ec-af92-408c-8520-9c99eeff6219',	'82dbc729-165e-4b73-ba9b-04f4460c9d58'),
('fb3e557a-0faf-41cc-b0a2-b178ad682096',	'001a61ec-af92-408c-8520-9c99eeff6219',	'ec2ccd0c-1691-4a2e-85bb-bee6d58a8214'),
('389efc51-49d1-4a1a-ac83-fa26d2b9f82f',	'001a61ec-af92-408c-8520-9c99eeff6219',	'4fa6fbea-cdde-473f-8dc5-c1f2c86020f1'),
('f0fcdaed-48e3-4465-86c7-36c492b7b3c2',	'001a61ec-af92-408c-8520-9c99eeff6219',	'aeb02550-5e55-45f2-98e2-f9e07d40bfc9'),
('8b4ed5d6-80a6-4da2-8e62-776c633eb643',	'001a61ec-af92-408c-8520-9c99eeff6219',	'36ec096b-615d-49e4-b789-7764736cee00'),
('a03f4fda-88ed-4a6c-a1b6-e612e835fc27',	'001a61ec-af92-408c-8520-9c99eeff6219',	'c5275e47-6666-4478-accd-0880a5998432'),
('1e9b365b-bdf3-4258-aee2-06662bafc69f',	'3ce275f5-3e8a-4a64-a30f-13077c58ac6d',	'1d3881de-29d1-4e97-a9fb-fd7aa058d974'),
('b2632a66-b598-4ae1-a0ae-a6d794101bd5',	'3ce275f5-3e8a-4a64-a30f-13077c58ac6d',	'b22d06a6-d3ff-4b20-890c-e993bbac8428'),
('35ef17f5-94c8-49b2-b19a-9eab4cf959ec',	'3ce275f5-3e8a-4a64-a30f-13077c58ac6d',	'f46069ec-5c97-4e3c-9710-5bb026c0a6aa'),
('2134d242-204b-46a5-9c9c-0ccfdf11028a',	'3ce275f5-3e8a-4a64-a30f-13077c58ac6d',	'9cb87d3d-4a7b-4ad4-8b11-c326e08ec374'),
('ba491e7f-aead-4dc4-8a98-8827fdc92645',	'3ce275f5-3e8a-4a64-a30f-13077c58ac6d',	'dc837767-d4c5-4156-8f19-4c291c0614e4'),
('4fc57f75-4525-4271-bcd2-a63957cf69b3',	'3ce275f5-3e8a-4a64-a30f-13077c58ac6d',	'c7e7c8fc-7401-4839-a0b3-f1bd8d850c3f'),
('592a399e-41d4-40c9-956d-00a7f5c8aea9',	'3ce275f5-3e8a-4a64-a30f-13077c58ac6d',	'c3334e41-fd56-40b9-9249-9d752d7597ab'),
('c5cc45be-393f-4c99-b814-58ff7d1864a5',	'3ce275f5-3e8a-4a64-a30f-13077c58ac6d',	'83fa8c2f-83d5-4df4-b86a-7f5f3004d50d'),
('da8a22ac-e099-4b73-b8dd-25bdded39b6e',	'3ce275f5-3e8a-4a64-a30f-13077c58ac6d',	'11199035-ae6b-4fd2-bbef-64e0c0e4bb77'),
('73744926-f00f-47f5-bd54-b1220b5d5d51',	'3ce275f5-3e8a-4a64-a30f-13077c58ac6d',	'41d50ad9-ddcf-413a-a101-96138721e888');

DROP TABLE IF EXISTS "aut_user";
CREATE TABLE "aut_user" (
    "id" uniqueidentifier DEFAULT NEWID() NOT NULL,
    "aut_group_id" uniqueidentifier NOT NULL,
    "email" varchar(50) NOT NULL,
    "nama" varchar(50) NOT NULL,
    "is_active" bigint NOT NULL,
    "auth_uid" uniqueidentifier,
    "password" text,
    "reset_token" text,
    "mst_bank_custody_id" uniqueidentifier,
    CONSTRAINT "aut_user_email_key" UNIQUE ("email"),
    CONSTRAINT "aut_user_pkey" PRIMARY KEY ("id")
);

INSERT INTO "aut_user" ("id", "aut_group_id", "email", "nama", "is_active", "auth_uid", "password", "reset_token", "mst_bank_custody_id") VALUES
('f03cf120-728d-43f9-8871-c0447167554d',	'001a61ec-af92-408c-8520-9c99eeff6219',	'dashuser@bpjs-kesehatan.go.id',	'Dashboard User',	1,	NULL,	'$2a$08$pwS0LDPNkdqJ8ohOPgn0eOiSlCgzT0W/GQq4hqefPw.l5rzh5IuKq',	NULL,	NULL),
('d81b9f19-7386-4204-9f10-80b8e27484f6',	'3ce275f5-3e8a-4a64-a30f-13077c58ac6d',	'dashadmin@bpjs-kesehatan.go.id',	'Admin Mandiri',	1,	NULL,	'$2a$08$ozj3RmOrxjBmzBcCLXB84OABERqPqFre3gCMb4f5DRTn5iTdxx6Fy',	NULL,	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('ee9551f5-d105-498f-b98a-6c9a5f8440ff',	'001a61ec-af92-408c-8520-9c99eeff6219',	'devuser@gmail.com',	'Dev',	1,	NULL,	'$2a$08$8OfbioAXmrhWlU3fZoia2u13wrskJW6khGZgLFmSuhRY9Fu8F5oAS',	NULL,	NULL),
('1842cc9c-24b9-4da9-8f77-cfb797c62e4f',	'3ce275f5-3e8a-4a64-a30f-13077c58ac6d',	'rahmatoktavian@gmail.com',	'Rahmat Oktavian',	1,	'2070590f-7b7a-4a14-b2eb-e646e5077a52',	'$2a$12$ANnemBgMlCvQXiOM2bMLGOEfvSHIlvL/ouVFL3or2Vhexfv0ttUmq',	NULL,	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625');

DROP TABLE IF EXISTS "mst_bank_custody";
CREATE TABLE "mst_bank_custody" (
    "id" uniqueidentifier DEFAULT NEWID() NOT NULL,
    "nama" varchar(255) NOT NULL,
    "urutan" smallint NOT NULL,
    CONSTRAINT "mst_bank_custody_pkey" PRIMARY KEY ("id")
);

INSERT INTO "mst_bank_custody" ("id", "nama", "urutan") VALUES
('0b6f869d-0cbc-4e60-8f5c-ef0e49544625',	'Bank Mandiri',	1);

DROP TABLE IF EXISTS "mst_issuer";
CREATE TABLE "mst_issuer" (
    "id" uniqueidentifier DEFAULT NEWID() NOT NULL,
    "mst_rating_id" uniqueidentifier NOT NULL,
    "kode" varchar(20) NOT NULL,
    "nama" varchar(255) NOT NULL,
    "pd" double precision,
    "urutan" smallint NOT NULL,
    "lgd" double precision,
    "warna" varchar(20),
    CONSTRAINT "mst_issuer_kode_key" UNIQUE ("kode"),
    CONSTRAINT "mst_issuer_pkey" PRIMARY KEY ("id")
);

INSERT INTO "mst_issuer" ("id", "mst_rating_id", "kode", "nama", "pd", "urutan", "lgd", "warna") VALUES
('73b4ee36-f073-4765-b95c-c30a58fb44d7',	'ba10fcf9-12ed-4589-bc3a-adea05758070',	'BRI',	'Bank Rakyat Indonesia',	0.095427915,	3,	45,	'#049edb'),
('c9f31122-3359-4df8-9422-0181e0c069f7',	'ba10fcf9-12ed-4589-bc3a-adea05758070',	'RI',	'Pemerintah RI',	0,	2,	0,	'#f21616'),
('e8588c78-9d26-42b9-b1c5-8dd9caf89d7f',	'ba10fcf9-12ed-4589-bc3a-adea05758070',	'MANDIRI',	'Bank Mandiri',	0.095427915,	1,	45,	'#25197d'),
('85b7239d-1c80-4ea5-bb34-872bfa361bee',	'ba10fcf9-12ed-4589-bc3a-adea05758070',	'BNI',	'Bank Negara Indonesia',	0.095427915,	4,	45,	'#eb7e1e');

DROP TABLE IF EXISTS "mst_kbmi";
CREATE TABLE "mst_kbmi" (
    "id" uniqueidentifier DEFAULT NEWID() NOT NULL,
    "kode" varchar(20) NOT NULL,
    "nama" varchar(255) NOT NULL,
    "urutan" smallint,
    CONSTRAINT "mst_kbmi_kode_key" UNIQUE ("kode"),
    CONSTRAINT "mst_kbmi_pkey" PRIMARY KEY ("id")
);

INSERT INTO "mst_kbmi" ("id", "kode", "nama", "urutan") VALUES
('dbb9b64b-8fc9-40c3-b35c-54b35858dd85',	'1',	'KBMI 1',	1),
('30cd6bd0-4dea-48a4-9abc-c1aa36012b50',	'2',	'KBMI 2',	2),
('925c12b0-2f91-485a-9047-e5ac9937cb63',	'3',	'KBMI 3',	3),
('82a1ff1e-066e-424b-a77f-cc756c1a1865',	'4',	'KBMI 4',	4);

DROP TABLE IF EXISTS "mst_kepemilikan";
CREATE TABLE "mst_kepemilikan" (
    "id" uniqueidentifier DEFAULT NEWID() NOT NULL,
    "kode" varchar(20) NOT NULL,
    "nama" varchar(255) NOT NULL,
    "urutan" smallint,
    CONSTRAINT "mst_kepemilikan_kode_key" UNIQUE ("kode"),
    CONSTRAINT "mst_kepemilikan_pkey" PRIMARY KEY ("id")
);

INSERT INTO "mst_kepemilikan" ("id", "kode", "nama", "urutan") VALUES
('c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'BUMN',	'BUMN',	1),
('4902b1e8-beda-49a9-8303-3e3a36a95635',	'BPD',	'BPD',	2),
('85652f7e-4559-493a-890f-29fc26219d00',	'SWASTA',	'SWASTA',	3);

DROP TABLE IF EXISTS "mst_pengelolaan";
CREATE TABLE "mst_pengelolaan" (
    "id" uniqueidentifier DEFAULT NEWID() NOT NULL,
    "kode" varchar(20) NOT NULL,
    "nama" varchar(255) NOT NULL,
    "urutan" smallint,
    CONSTRAINT "mst_pengelolaan_kode_key" UNIQUE ("kode"),
    CONSTRAINT "mst_pengelolaan_pkey" PRIMARY KEY ("id")
);

INSERT INTO "mst_pengelolaan" ("id", "kode", "nama", "urutan") VALUES
('a355afc6-ef1a-491b-9c66-b4ba435668cf',	'KONVENSIONAL',	'KONVENSIONAL',	1),
('745f0edf-846f-4afb-9eca-bc1cb99532ff',	'SYARIAH',	'SYARIAH',	2);

DROP TABLE IF EXISTS "mst_rating";
CREATE TABLE "mst_rating" (
    "id" uniqueidentifier DEFAULT NEWID() NOT NULL,
    "nama" varchar(50) NOT NULL,
    "pd" real NOT NULL,
    "urutan" smallint,
    CONSTRAINT "mst_rating_pkey" PRIMARY KEY ("id")
);

INSERT INTO "mst_rating" ("id", "nama", "pd", "urutan") VALUES
('ba10fcf9-12ed-4589-bc3a-adea05758070',	'idAAA',	0.01,	1),
('04ad9d74-52b4-4719-a0e5-082943a6b1f1',	'idAA',	0.01,	2),
('9cf33914-5b2e-42b4-b7d5-8296918c07b9',	'idA',	0.01,	3),
('ba0802bf-90d8-4c11-b0bb-e2ef7d716d55',	'idBBB',	0.44,	4),
('1ea8f18a-d135-4ab2-b61b-8a6968cc3c8e',	'idBB',	28.5,	5),
('1a9c6b76-6868-4d78-95b3-58d63636535d',	'idB',	50,	6),
('d40a5385-e9e6-4068-8e7a-8f701922d478',	'idCCC',	100,	7);

DROP TABLE IF EXISTS "mst_tenor";
CREATE TABLE "mst_tenor" (
    "id" uniqueidentifier DEFAULT NEWID() NOT NULL,
    "kode" varchar(20) NOT NULL,
    "nama" varchar(255) NOT NULL,
    "urutan" smallint,
    "tipe" varchar(200),
    CONSTRAINT "mst_tenor_kode_key" UNIQUE ("kode"),
    CONSTRAINT "mst_tenor_pkey" PRIMARY KEY ("id")
);

INSERT INTO "mst_tenor" ("id", "kode", "nama", "urutan", "tipe") VALUES
('aea77872-b332-4c9c-8014-27db08d5db23',	'DOC',	'DOC',	5,	'deposito'),
('0255665f-0735-4590-8040-ae7914c83d1d',	'12',	'> 12 Bulan',	4,	'obligasi,sbn,sbi'),
('879d0eab-54b2-42c3-97c4-d42f47d9207f',	'1',	'1 Bulan',	1,	'deposito'),
('2aa38248-2dbc-4334-bc11-fa61ded98f5c',	'3',	'3 Bulan',	2,	'deposito'),
('99d18807-e4b2-4e8a-83c5-8c4d14494687',	'3-12',	'3-12 Bulan',	3,	'obligasi,sbn,sbi');

DROP TABLE IF EXISTS "mst_twrr_coa";
CREATE TABLE "mst_twrr_coa" (
    "id" uniqueidentifier DEFAULT NEWID() NOT NULL,
    "tipe" varchar(255) NOT NULL,
    "kolom" varchar(25) NOT NULL,
    "label" varchar(255) NOT NULL,
    "urutan" smallint NOT NULL,
    "tampil" smallint,
    "kolom_xls" varchar(255),
    CONSTRAINT "mst_twrr_coa_pkey" PRIMARY KEY ("id")
);

INSERT INTO "mst_twrr_coa" ("id", "tipe", "kolom", "label", "urutan", "tampil", "kolom_xls") VALUES
('fd0c830a-5569-4ba6-a38a-ee7ff2626c52',	'assets',	'as1',	'Cash',	1,	1,	'Cash'),
('2bce44b1-a69d-4aca-976f-f0a4c6391f10',	'assets',	'as2',	'Time Deposit',	2,	1,	'TimeDeposit'),
('d1d062cd-3d71-4c77-8bb2-d791e3a64bed',	'assets',	'as3',	'Bond',	3,	1,	'Bond'),
('9e25a7f2-4a2d-410a-8825-3f6ea951440d',	'assets',	'as6',	'Bond Int',	6,	1,	'BondInt'),
('daa5dde2-1b36-4b87-9fe3-33e4ca9f3394',	'assets',	'as7',	' AR Sale',	7,	1,	'ARSale'),
('4fabba3c-d1a5-43a9-a6b9-666f9e592d02',	'assets',	'as8',	' AR Other',	8,	1,	'AROther'),
('84d6f7bf-37de-4d99-b293-cd963e53dba7',	'liabilities',	'li1',	'Custody Fee',	1,	1,	'CustodyFee'),
('71e0c0f6-2c28-4363-81df-88eae83156d3',	'liabilities',	'li2',	'Purchase',	2,	1,	'Purchase'),
('47a1e589-110a-4331-9f2b-122a5df03efe',	'liabilities',	'li3',	'Subscription',	3,	1,	'Subscription'),
('cfc9216b-3f90-44fa-9cb6-5479546381c6',	'liabilities',	'li5',	'Liabilities Other',	5,	1,	'LiabilitiesOther'),
('2fea7b01-2520-4678-8023-432124ba8da7',	'liabilities',	'li4',	'Payable Other',	4,	1,	'PayableOther'),
('45d8c896-7325-45ae-82ad-a00b3738b878',	'assets',	'as4',	'Current Acc Int',	4,	1,	'CurrentAccInt'),
('11ae560a-3ec1-4c9e-b332-13d9e07c8b01',	'assets',	'as5',	'Time Deposit Int',	5,	1,	'TimeDepositInt');

DROP TABLE IF EXISTS "trx_porto";
CREATE TABLE "trx_porto" (
    "id" uniqueidentifier NOT NULL,
    "trx_porto_file_id" uniqueidentifier NOT NULL,
    "mst_issuer_id" uniqueidentifier NOT NULL,
    "mst_kbmi_id" uniqueidentifier,
    "mst_kepemilikan_id" uniqueidentifier,
    "mst_pengelolaan_id" uniqueidentifier NOT NULL,
    "mst_tenor_id" uniqueidentifier NOT NULL,
    "tipe" varchar(25) NOT NULL,
    "unique_id" varchar(255) NOT NULL,
    "no_security" varchar(255),
    "start_date" date,
    "end_date" date,
    "interest_date" date,
    "nominal" numeric(19,0) NOT NULL,
    "sisa_tenor" numeric(19,0),
    "rate" float(10),
    "pd" float NOT NULL,
    "lgd" float NOT NULL,
    "ecl" numeric(19,0) NOT NULL,
    "created_at" DATETIMEOFFSET NOT NULL,
    "updated_at" DATETIMEOFFSET,
    "mst_bank_custody_id" uniqueidentifier,
    CONSTRAINT "trx_porto_pkey" PRIMARY KEY ("id")
);

INSERT INTO "trx_porto" ("id", "trx_porto_file_id", "mst_issuer_id", "mst_kbmi_id", "mst_kepemilikan_id", "mst_pengelolaan_id", "mst_tenor_id", "tipe", "unique_id", "no_security", "start_date", "end_date", "interest_date", "nominal", "sisa_tenor", "rate", "pd", "lgd", "ecl", "created_at", "updated_at", "mst_bank_custody_id") VALUES
('1bb957d5-1af2-42a6-8962-9285853c0000',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	'c9f31122-3359-4df8-9422-0181e0c069f7',	NULL,	NULL,	'745f0edf-846f-4afb-9eca-bc1cb99532ff',	'0255665f-0735-4590-8040-ae7914c83d1d',	'sbn',	'SBSN SERI PBS031    ',	NULL,	'2021-07-29',	'2024-07-15',	'2024-01-15',	400000000000,	NULL,	4,	0,	0,	0,	'2023-10-26 15:02:27+00',	NULL,	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('a277cc05-4596-4bf3-ab45-9d2005397570',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	'73b4ee36-f073-4765-b95c-c30a58fb44d7',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'2aa38248-2dbc-4334-bc11-fa61ded98f5c',	'deposito',	'BANK BRI1000000000000',	NULL,	'2023-07-21',	'2023-10-21',	'2023-10-21',	1000000000000,	33,	5.75,	0.095427915,	45,	39381085.7350241,	'2023-10-26 15:02:27+00',	NULL,	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('5c8d3684-ebaa-4687-85ca-5cc5c5fe7333',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	'73b4ee36-f073-4765-b95c-c30a58fb44d7',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'2aa38248-2dbc-4334-bc11-fa61ded98f5c',	'deposito',	'BANK BRI3518000000000',	NULL,	'2023-08-14',	'2023-11-14',	'2023-11-14',	3518000000000,	57,	5.75,	0.095427915,	45,	239293342.159353,	'2023-10-26 15:02:27+00',	NULL,	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('c7448450-28bd-489e-a629-1bcae1610e12',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	'73b4ee36-f073-4765-b95c-c30a58fb44d7',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'879d0eab-54b2-42c3-97c4-d42f47d9207f',	'deposito',	'BANK BRI100000000000',	NULL,	'2023-08-22',	'2023-09-22',	'2023-09-22',	100000000000,	4,	6.1,	0.095427915,	45,	477364.850128836,	'2023-10-26 15:02:27+00',	NULL,	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('10054a87-c046-4794-ba64-4b655a3ba34f',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	'73b4ee36-f073-4765-b95c-c30a58fb44d7',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'2aa38248-2dbc-4334-bc11-fa61ded98f5c',	'deposito',	'BANK BRI500000000000',	NULL,	'2023-09-07',	'2023-12-07',	'2023-12-07',	500000000000,	80,	6.3,	0.095427915,	45,	47731674.5779333,	'2023-10-26 15:02:27+00',	NULL,	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('591a05b2-0186-4ed3-b9e7-16a07b1ac191',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	'73b4ee36-f073-4765-b95c-c30a58fb44d7',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'2aa38248-2dbc-4334-bc11-fa61ded98f5c',	'deposito',	'BANK BRI750000000000',	NULL,	'2023-09-08',	'2023-12-08',	'2023-12-08',	750000000000,	81,	6.3,	0.095427915,	45,	72492384.642231,	'2023-10-26 15:02:27+00',	NULL,	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('040d2d97-e968-4374-b3af-d3f16649bab9',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	'73b4ee36-f073-4765-b95c-c30a58fb44d7',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'aea77872-b332-4c9c-8014-27db08d5db23',	'deposito',	'BANK BRI500000000000',	NULL,	'2023-09-14',	'2023-09-21',	'2023-09-21',	500000000000,	3,	5,	0.095427915,	45,	1790120.56170935,	'2023-10-26 15:02:27+00',	'2023-10-26 15:02:27+00',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('f5996a23-b9c3-43ea-8e19-9bec7bb5cec8',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	'73b4ee36-f073-4765-b95c-c30a58fb44d7',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'aea77872-b332-4c9c-8014-27db08d5db23',	'deposito',	'BANK BRI614100000000',	NULL,	'2023-09-14',	'2023-09-29',	'2023-09-29',	614100000000,	11,	5,	0.095427915,	45,	8061543.41923027,	'2023-10-26 15:02:27+00',	NULL,	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('44465596-acca-4471-9360-2cca0d978df4',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	'73b4ee36-f073-4765-b95c-c30a58fb44d7',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'879d0eab-54b2-42c3-97c4-d42f47d9207f',	'deposito',	'BANK BRI2332000000000',	NULL,	'2023-09-14',	'2023-10-14',	'2023-10-14',	2332000000000,	26,	6.3,	0.095427915,	45,	72356853.138581,	'2023-10-26 15:02:27+00',	NULL,	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('1c292470-bc06-4e72-a5a2-7dcba125a669',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	'73b4ee36-f073-4765-b95c-c30a58fb44d7',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'879d0eab-54b2-42c3-97c4-d42f47d9207f',	'deposito',	'BANK BRI1500000000000',	NULL,	'2023-09-18',	'2023-10-18',	'2023-10-18',	1500000000000,	30,	6.3,	0.095427915,	45,	53701694.172989,	'2023-10-26 15:02:27+00',	NULL,	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('b79e996e-2a79-4a68-a208-8b03a7ae760b',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	'e8588c78-9d26-42b9-b1c5-8dd9caf89d7f',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'2aa38248-2dbc-4334-bc11-fa61ded98f5c',	'deposito',	'BANK MANDIRI1000000000000',	NULL,	'2023-07-13',	'2023-10-13',	'2023-10-13',	1000000000000,	25,	5.75,	0.095427915,	45,	29834472.3431154,	'2023-10-26 15:02:27+00',	NULL,	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('b68c79ee-5128-4040-8160-4b33e3dda27d',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	'e8588c78-9d26-42b9-b1c5-8dd9caf89d7f',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'2aa38248-2dbc-4334-bc11-fa61ded98f5c',	'deposito',	'BANK MANDIRI1000000000000',	NULL,	'2023-07-21',	'2023-10-21',	'2023-10-21',	1000000000000,	33,	5.75,	0.095427915,	45,	39381085.7350241,	'2023-10-26 15:02:28+00',	NULL,	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('035ae0cc-80bb-4035-bb01-5ec24ad295f4',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	'e8588c78-9d26-42b9-b1c5-8dd9caf89d7f',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'2aa38248-2dbc-4334-bc11-fa61ded98f5c',	'deposito',	'BANK MANDIRI2000000000000',	NULL,	'2023-08-16',	'2023-11-16',	'2023-11-16',	2000000000000,	59,	5.75,	0.095427915,	45,	140812360.951526,	'2023-10-26 15:02:28+00',	NULL,	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('c326a148-511f-4bc7-a77d-5f9913e5a118',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	'e8588c78-9d26-42b9-b1c5-8dd9caf89d7f',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'879d0eab-54b2-42c3-97c4-d42f47d9207f',	'deposito',	'BANK MANDIRI500000000000',	NULL,	'2023-09-07',	'2023-10-07',	'2023-10-07',	500000000000,	19,	5.9,	0.095427915,	45,	11337189.6892173,	'2023-10-26 15:02:28+00',	NULL,	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('2fb1e176-29e9-43c7-ac44-078aefdb276c',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	'e8588c78-9d26-42b9-b1c5-8dd9caf89d7f',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'879d0eab-54b2-42c3-97c4-d42f47d9207f',	'deposito',	'BANK MANDIRI500000000000',	NULL,	'2023-09-13',	'2023-10-13',	'2023-10-13',	500000000000,	25,	5.9,	0.095427915,	45,	14917236.1715577,	'2023-10-26 15:02:28+00',	NULL,	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('e1b30d5a-a6a6-458e-abf4-c1c929d5ecd9',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	'85b7239d-1c80-4ea5-bb34-872bfa361bee',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'2aa38248-2dbc-4334-bc11-fa61ded98f5c',	'deposito',	'BANK NEGARA INDONESIA3500000000000',	NULL,	'2023-08-14',	'2023-11-14',	'2023-11-14',	3500000000000,	57,	5.75,	0.095427915,	45,	238068987.367179,	'2023-10-26 15:02:28+00',	NULL,	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('eed11178-4579-4a79-bd7a-9311cd15323d',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	'85b7239d-1c80-4ea5-bb34-872bfa361bee',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'879d0eab-54b2-42c3-97c4-d42f47d9207f',	'deposito',	'BANK NEGARA INDONESIA180000000000',	NULL,	'2023-08-21',	'2023-09-21',	'2023-09-21',	180000000000,	3,	5.75,	0.095427915,	45,	644443.402215367,	'2023-10-26 15:02:28+00',	NULL,	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('c34c9242-b6f9-42ee-adc0-16b97c37005c',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	'85b7239d-1c80-4ea5-bb34-872bfa361bee',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'2aa38248-2dbc-4334-bc11-fa61ded98f5c',	'deposito',	'BANK NEGARA INDONESIA391170000000',	NULL,	'2023-08-22',	'2023-11-22',	'2023-11-22',	391170000000,	65,	6,	0.095427915,	45,	30341302.0825477,	'2023-10-26 15:02:28+00',	NULL,	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('12e773fc-1416-496c-bc00-1c940ed831ad',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	'85b7239d-1c80-4ea5-bb34-872bfa361bee',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'2aa38248-2dbc-4334-bc11-fa61ded98f5c',	'deposito',	'BANK NEGARA INDONESIA616020000000',	NULL,	'2023-08-28',	'2023-11-28',	'2023-11-28',	616020000000,	71,	6,	0.095427915,	45,	52192130.3039951,	'2023-10-26 15:02:28+00',	NULL,	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('fdf299f0-4716-4202-86b2-72c4352f5554',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	'85b7239d-1c80-4ea5-bb34-872bfa361bee',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'879d0eab-54b2-42c3-97c4-d42f47d9207f',	'deposito',	'BANK NEGARA INDONESIA1600000000000',	NULL,	'2023-09-07',	'2023-10-07',	'2023-10-07',	1600000000000,	19,	5.9,	0.095427915,	45,	36279007.0054952,	'2023-10-26 15:02:28+00',	NULL,	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('ea524b28-83f3-4c4a-a186-92887da4f59d',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	'85b7239d-1c80-4ea5-bb34-872bfa361bee',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'879d0eab-54b2-42c3-97c4-d42f47d9207f',	'deposito',	'BANK NEGARA INDONESIA260020000000',	NULL,	'2023-09-08',	'2023-10-08',	'2023-10-08',	260020000000,	20,	5.9,	0.095427915,	45,	6206088.74537914,	'2023-10-26 15:02:28+00',	NULL,	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('1934d9b6-41ee-4f2e-b4da-e46d67882960',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	'85b7239d-1c80-4ea5-bb34-872bfa361bee',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'879d0eab-54b2-42c3-97c4-d42f47d9207f',	'deposito',	'BANK NEGARA INDONESIA1891420000000',	NULL,	'2023-09-11',	'2023-10-11',	'2023-10-11',	1891420000000,	23,	5.9,	0.095427915,	45,	51915293.9446738,	'2023-10-26 15:02:28+00',	NULL,	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('54e19957-18a6-4ee6-bc4c-12145b5c5d75',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	'85b7239d-1c80-4ea5-bb34-872bfa361bee',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'879d0eab-54b2-42c3-97c4-d42f47d9207f',	'deposito',	'BANK NEGARA INDONESIA314520000000',	NULL,	'2023-09-13',	'2023-10-13',	'2023-10-13',	314520000000,	25,	5.9,	0.095427915,	45,	9383538.24135666,	'2023-10-26 15:02:28+00',	NULL,	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('cc9b4fc7-9e91-48c7-aed7-6de0e8b0d411',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	'85b7239d-1c80-4ea5-bb34-872bfa361bee',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'879d0eab-54b2-42c3-97c4-d42f47d9207f',	'deposito',	'BANK NEGARA INDONESIA246850000000',	NULL,	'2023-09-14',	'2023-10-14',	'2023-10-14',	246850000000,	26,	5.9,	0.095427915,	45,	7659214.92163753,	'2023-10-26 15:02:28+00',	NULL,	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('a942f1f3-9b27-44d1-9174-7d9a4b989505',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	'85b7239d-1c80-4ea5-bb34-872bfa361bee',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'879d0eab-54b2-42c3-97c4-d42f47d9207f',	'deposito',	'BANK NEGARA INDONESIA500000000000',	NULL,	'2023-09-18',	'2023-10-18',	'2023-10-18',	500000000000,	30,	5.9,	0.095427915,	45,	17900564.7243297,	'2023-10-26 15:02:28+00',	NULL,	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('e6aca377-99c9-45c1-938b-c2e46de2c16a',	'7757ebfb-8fad-4023-b805-3903c04d44e8',	'e8588c78-9d26-42b9-b1c5-8dd9caf89d7f',	'dbb9b64b-8fc9-40c3-b35c-54b35858dd85',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'2aa38248-2dbc-4334-bc11-fa61ded98f5c',	'sbi',	'BPD BENGKULU50000000000',	NULL,	'2023-07-03',	'2023-10-03',	'2023-10-03',	50000000000,	15,	6.25,	0.095427915,	45,	895046.038602298,	'2023-10-30 09:03:04+00',	NULL,	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('a82840e2-ac32-48e1-b8a5-f9f819197c38',	'7757ebfb-8fad-4023-b805-3903c04d44e8',	'e8588c78-9d26-42b9-b1c5-8dd9caf89d7f',	'dbb9b64b-8fc9-40c3-b35c-54b35858dd85',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'2aa38248-2dbc-4334-bc11-fa61ded98f5c',	'sbi',	'BPD BENGKULU68000000000',	NULL,	'2023-07-04',	'2023-10-04',	'2023-10-04',	68000000000,	16,	6.25,	0.095427915,	45,	1298411.73162431,	'2023-10-30 09:03:04+00',	NULL,	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('a6737e75-84bd-4c73-9db9-007389ca318f',	'7757ebfb-8fad-4023-b805-3903c04d44e8',	'e8588c78-9d26-42b9-b1c5-8dd9caf89d7f',	'dbb9b64b-8fc9-40c3-b35c-54b35858dd85',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'2aa38248-2dbc-4334-bc11-fa61ded98f5c',	'obligasi',	'BPD BENGKULU55000000000',	NULL,	'2023-07-06',	'2023-10-06',	'2023-10-06',	55000000000,	18,	6.25,	0.095427915,	45,	1181456.0710777,	'2023-10-30 09:03:04+00',	NULL,	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('f571f095-a760-46c0-a7a1-6145bc23f36d',	'7757ebfb-8fad-4023-b805-3903c04d44e8',	'e8588c78-9d26-42b9-b1c5-8dd9caf89d7f',	'dbb9b64b-8fc9-40c3-b35c-54b35858dd85',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'2aa38248-2dbc-4334-bc11-fa61ded98f5c',	'obligasi',	'BPD BENGKULU297000000000',	NULL,	'2023-07-10',	'2023-10-10',	'2023-10-10',	297000000000,	22,	6.25,	0.095427915,	45,	7797568.71041513,	'2023-10-30 09:03:04+00',	NULL,	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('c850dd1b-7183-49ea-b1d5-976fea7a42a5',	'9665c474-d464-432e-bf69-84f8e4f317ff',	'e8588c78-9d26-42b9-b1c5-8dd9caf89d7f',	'dbb9b64b-8fc9-40c3-b35c-54b35858dd85',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'2aa38248-2dbc-4334-bc11-fa61ded98f5c',	'sbi',	'BPD BENGKULU50000000000',	NULL,	'2023-10-03',	'2023-12-03',	'2023-10-03',	50000000000,	15,	6.25,	0.095427915,	45,	895046.038602298,	'2023-10-30 15:11:05+00',	NULL,	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('1b78e50a-59c2-4e2d-b0cc-84c0d2604f22',	'9665c474-d464-432e-bf69-84f8e4f317ff',	'e8588c78-9d26-42b9-b1c5-8dd9caf89d7f',	'dbb9b64b-8fc9-40c3-b35c-54b35858dd85',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'2aa38248-2dbc-4334-bc11-fa61ded98f5c',	'sbi',	'BPD BENGKULU68000000000',	NULL,	'2023-10-04',	'2023-12-04',	'2023-10-04',	68000000000,	16,	6.25,	0.095427915,	45,	1298411.73162431,	'2023-10-30 15:11:05+00',	NULL,	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('c7577956-a911-407c-9308-bcc5c8e6667f',	'9665c474-d464-432e-bf69-84f8e4f317ff',	'e8588c78-9d26-42b9-b1c5-8dd9caf89d7f',	'dbb9b64b-8fc9-40c3-b35c-54b35858dd85',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'2aa38248-2dbc-4334-bc11-fa61ded98f5c',	'obligasi',	'BPD BENGKULU55000000000',	NULL,	'2023-10-06',	'2023-12-06',	'2023-10-06',	55000000000,	18,	6.25,	0.095427915,	45,	1181456.0710777,	'2023-10-30 15:11:06+00',	NULL,	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('32c17312-9f80-4ced-b0ea-dffd49c431fb',	'9665c474-d464-432e-bf69-84f8e4f317ff',	'e8588c78-9d26-42b9-b1c5-8dd9caf89d7f',	'dbb9b64b-8fc9-40c3-b35c-54b35858dd85',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'2aa38248-2dbc-4334-bc11-fa61ded98f5c',	'obligasi',	'BPD BENGKULU297000000000',	NULL,	'2023-10-10',	'2023-12-10',	'2023-10-10',	297000000000,	22,	6.25,	0.095427915,	45,	7797568.71041513,	'2023-10-30 15:11:06+00',	NULL,	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625');

DROP TABLE IF EXISTS "trx_porto_file";
CREATE TABLE "trx_porto_file" (
    "id" uniqueidentifier NOT NULL,
    "file_name" varchar(255) NOT NULL,
    "status" BIT NOT NULL,
    "created_at" DATETIMEOFFSET NOT NULL,
    "aut_user_id" uniqueidentifier,
    CONSTRAINT "trx_porto_file_pkey" PRIMARY KEY ("id")
);

INSERT INTO "trx_porto_file" ("id", "file_name", "status", "created_at", "aut_user_id") VALUES
('436d86b8-e47e-45e3-963e-f1eb72b54e2e',	'upload_porto_sample.xlsx',	't',	'2023-10-26 15:02:27+00',	'd81b9f19-7386-4204-9f10-80b8e27484f6'),
('956261e4-23e4-44b6-8aad-5a45219e79ca',	'upload_porto_sample_sbnsbi.xlsx',	'f',	'2023-10-30 09:00:55+00',	'd81b9f19-7386-4204-9f10-80b8e27484f6'),
('7757ebfb-8fad-4023-b805-3903c04d44e8',	'upload_porto_sample_sbnsbi.xlsx',	't',	'2023-10-30 09:03:04+00',	'd81b9f19-7386-4204-9f10-80b8e27484f6'),
('9665c474-d464-432e-bf69-84f8e4f317ff',	'upload_porto_sample_sbiobli.xlsx',	't',	'2023-10-30 15:11:05+00',	'1842cc9c-24b9-4da9-8f77-cfb797c62e4f');

DROP TABLE IF EXISTS "trx_porto_filedata";
CREATE TABLE "trx_porto_filedata" (
    "id" uniqueidentifier DEFAULT NEWID() NOT NULL,
    "trx_porto_file_id" uniqueidentifier NOT NULL,
    "trx_porto_id" uniqueidentifier,
    "mst_issuer_id" uniqueidentifier,
    "mst_kbmi_id" uniqueidentifier,
    "mst_kepemilikan_id" uniqueidentifier,
    "mst_pengelolaan_id" uniqueidentifier,
    "mst_tenor_id" uniqueidentifier,
    "tipe" varchar(25) NOT NULL,
    "unique_id" varchar(255) NOT NULL,
    "no_security" varchar(255),
    "start_date" date,
    "end_date" date,
    "interest_date" date,
    "nominal" numeric(19,0) NOT NULL,
    "sisa_tenor" numeric(19,0),
    "rate" real,
    "pd" double precision NOT NULL,
    "lgd" double precision NOT NULL,
    "ecl" numeric(19,0) NOT NULL,
    "created_at" DATETIMEOFFSET NOT NULL,
    "status" BIT,
    "note" text,
    "mst_bank_custody_id" uniqueidentifier,
    CONSTRAINT "trx_porto_filedata_pkey" PRIMARY KEY ("id")
);

INSERT INTO "trx_porto_filedata" ("id", "trx_porto_file_id", "trx_porto_id", "mst_issuer_id", "mst_kbmi_id", "mst_kepemilikan_id", "mst_pengelolaan_id", "mst_tenor_id", "tipe", "unique_id", "no_security", "start_date", "end_date", "interest_date", "nominal", "sisa_tenor", "rate", "pd", "lgd", "ecl", "created_at", "status", "note", "mst_bank_custody_id") VALUES
('9c4ddff8-8cdf-4614-8fef-91e90b871a5a',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	NULL,	'c9f31122-3359-4df8-9422-0181e0c069f7',	NULL,	NULL,	'745f0edf-846f-4afb-9eca-bc1cb99532ff',	'0255665f-0735-4590-8040-ae7914c83d1d',	'sbn',	'SBSN SERI PBS031    ',	NULL,	'2021-07-29',	'2024-07-15',	'2024-01-15',	400000000000,	NULL,	4,	0,	0,	0,	'2023-10-26 15:02:27+00',	't',	'',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('b3dd4813-6011-426d-b2cd-a7c07fc2690d',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	NULL,	'73b4ee36-f073-4765-b95c-c30a58fb44d7',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'aea77872-b332-4c9c-8014-27db08d5db23',	'deposito',	'BANK BRI500000000000',	NULL,	'2023-09-14',	'2023-09-19',	'2023-09-19',	500000000000,	1,	5,	0.095427915,	45,	596708,	'2023-10-26 15:02:27+00',	't',	'',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('fbff08a4-4216-4d4c-8733-29841edf0e3d',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	NULL,	'73b4ee36-f073-4765-b95c-c30a58fb44d7',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'2aa38248-2dbc-4334-bc11-fa61ded98f5c',	'deposito',	'BANK BRI1000000000000',	NULL,	'2023-07-21',	'2023-10-21',	'2023-10-21',	1000000000000,	33,	5.75,	0.095427915,	45,	39381086,	'2023-10-26 15:02:27+00',	't',	'',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('470c7142-883f-416f-a705-115964f6507b',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	NULL,	'73b4ee36-f073-4765-b95c-c30a58fb44d7',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'2aa38248-2dbc-4334-bc11-fa61ded98f5c',	'deposito',	'BANK BRI3518000000000',	NULL,	'2023-08-14',	'2023-11-14',	'2023-11-14',	3518000000000,	57,	5.75,	0.095427915,	45,	239293342,	'2023-10-26 15:02:27+00',	't',	'',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('51a22bb2-2f39-41d2-948b-83ef8297a698',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	NULL,	'73b4ee36-f073-4765-b95c-c30a58fb44d7',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'879d0eab-54b2-42c3-97c4-d42f47d9207f',	'deposito',	'BANK BRI100000000000',	NULL,	'2023-08-22',	'2023-09-22',	'2023-09-22',	100000000000,	4,	6.1,	0.095427915,	45,	477365,	'2023-10-26 15:02:27+00',	't',	'',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('5abff099-4b2e-4287-a16b-9da372337dbe',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	NULL,	'73b4ee36-f073-4765-b95c-c30a58fb44d7',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'2aa38248-2dbc-4334-bc11-fa61ded98f5c',	'deposito',	'BANK BRI500000000000',	NULL,	'2023-09-07',	'2023-12-07',	'2023-12-07',	500000000000,	80,	6.3,	0.095427915,	45,	47731675,	'2023-10-26 15:02:27+00',	't',	'',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('ab133b15-737b-4c80-9cf4-3e722ba97b14',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	NULL,	'73b4ee36-f073-4765-b95c-c30a58fb44d7',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'2aa38248-2dbc-4334-bc11-fa61ded98f5c',	'deposito',	'BANK BRI750000000000',	NULL,	'2023-09-08',	'2023-12-08',	'2023-12-08',	750000000000,	81,	6.3,	0.095427915,	45,	72492385,	'2023-10-26 15:02:27+00',	't',	'',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('051d66bc-b86e-4ee4-ae6d-dc24ef4be513',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	NULL,	'73b4ee36-f073-4765-b95c-c30a58fb44d7',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'aea77872-b332-4c9c-8014-27db08d5db23',	'deposito',	'BANK BRI500000000000',	NULL,	'2023-09-14',	'2023-09-21',	'2023-09-21',	500000000000,	3,	5,	0.095427915,	45,	1790121,	'2023-10-26 15:02:27+00',	't',	'',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('5266a41e-9c06-4295-b9b3-3b8d8e568c1e',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	NULL,	'73b4ee36-f073-4765-b95c-c30a58fb44d7',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'aea77872-b332-4c9c-8014-27db08d5db23',	'deposito',	'BANK BRI614100000000',	NULL,	'2023-09-14',	'2023-09-29',	'2023-09-29',	614100000000,	11,	5,	0.095427915,	45,	8061543,	'2023-10-26 15:02:27+00',	't',	'',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('c3ca73c4-d3ea-4a16-b970-b7e92d91952e',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	NULL,	'73b4ee36-f073-4765-b95c-c30a58fb44d7',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'879d0eab-54b2-42c3-97c4-d42f47d9207f',	'deposito',	'BANK BRI2332000000000',	NULL,	'2023-09-14',	'2023-10-14',	'2023-10-14',	2332000000000,	26,	6.3,	0.095427915,	45,	72356853,	'2023-10-26 15:02:27+00',	't',	'',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('38353c23-d59c-44c2-ae45-3ae373b1832a',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	NULL,	'73b4ee36-f073-4765-b95c-c30a58fb44d7',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'879d0eab-54b2-42c3-97c4-d42f47d9207f',	'deposito',	'BANK BRI1500000000000',	NULL,	'2023-09-18',	'2023-10-18',	'2023-10-18',	1500000000000,	30,	6.3,	0.095427915,	45,	53701694,	'2023-10-26 15:02:27+00',	't',	'',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('2a5e01bd-723c-4a53-927c-624c0dcce0e2',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	NULL,	'e8588c78-9d26-42b9-b1c5-8dd9caf89d7f',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'2aa38248-2dbc-4334-bc11-fa61ded98f5c',	'deposito',	'BANK MANDIRI1000000000000',	NULL,	'2023-07-13',	'2023-10-13',	'2023-10-13',	1000000000000,	25,	5.75,	0.095427915,	45,	29834472,	'2023-10-26 15:02:27+00',	't',	'',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('a6684631-6850-46ce-a446-86b1ed603b19',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	NULL,	'e8588c78-9d26-42b9-b1c5-8dd9caf89d7f',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'2aa38248-2dbc-4334-bc11-fa61ded98f5c',	'deposito',	'BANK MANDIRI1000000000000',	NULL,	'2023-07-21',	'2023-10-21',	'2023-10-21',	1000000000000,	33,	5.75,	0.095427915,	45,	39381086,	'2023-10-26 15:02:28+00',	't',	'',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('9f8c2b57-f043-46c5-aeca-e9053645e965',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	NULL,	'e8588c78-9d26-42b9-b1c5-8dd9caf89d7f',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'2aa38248-2dbc-4334-bc11-fa61ded98f5c',	'deposito',	'BANK MANDIRI2000000000000',	NULL,	'2023-08-16',	'2023-11-16',	'2023-11-16',	2000000000000,	59,	5.75,	0.095427915,	45,	140812361,	'2023-10-26 15:02:28+00',	't',	'',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('c3d2f5d9-9b4c-4e67-b414-5ae094fd2bff',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	NULL,	'e8588c78-9d26-42b9-b1c5-8dd9caf89d7f',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'879d0eab-54b2-42c3-97c4-d42f47d9207f',	'deposito',	'BANK MANDIRI500000000000',	NULL,	'2023-09-07',	'2023-10-07',	'2023-10-07',	500000000000,	19,	5.9,	0.095427915,	45,	11337190,	'2023-10-26 15:02:28+00',	't',	'',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('348d2314-c15d-4b62-9b60-9742788cec0f',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	NULL,	'e8588c78-9d26-42b9-b1c5-8dd9caf89d7f',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'879d0eab-54b2-42c3-97c4-d42f47d9207f',	'deposito',	'BANK MANDIRI500000000000',	NULL,	'2023-09-13',	'2023-10-13',	'2023-10-13',	500000000000,	25,	5.9,	0.095427915,	45,	14917236,	'2023-10-26 15:02:28+00',	't',	'',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('8fcf642c-fb59-415b-9109-aa158e040c6a',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	NULL,	'85b7239d-1c80-4ea5-bb34-872bfa361bee',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'2aa38248-2dbc-4334-bc11-fa61ded98f5c',	'deposito',	'BANK NEGARA INDONESIA3500000000000',	NULL,	'2023-08-14',	'2023-11-14',	'2023-11-14',	3500000000000,	57,	5.75,	0.095427915,	45,	238068987,	'2023-10-26 15:02:28+00',	't',	'',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('43fd8256-626d-4419-9a86-74184c2f338b',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	NULL,	'85b7239d-1c80-4ea5-bb34-872bfa361bee',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'879d0eab-54b2-42c3-97c4-d42f47d9207f',	'deposito',	'BANK NEGARA INDONESIA180000000000',	NULL,	'2023-08-21',	'2023-09-21',	'2023-09-21',	180000000000,	3,	5.75,	0.095427915,	45,	644443,	'2023-10-26 15:02:28+00',	't',	'',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('69706f31-c294-43af-8c78-33280ae29990',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	NULL,	'85b7239d-1c80-4ea5-bb34-872bfa361bee',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'2aa38248-2dbc-4334-bc11-fa61ded98f5c',	'deposito',	'BANK NEGARA INDONESIA391170000000',	NULL,	'2023-08-22',	'2023-11-22',	'2023-11-22',	391170000000,	65,	6,	0.095427915,	45,	30341302,	'2023-10-26 15:02:28+00',	't',	'',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('6e5d7dcf-de32-4c4a-8bb2-3a1831b23a51',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	NULL,	'85b7239d-1c80-4ea5-bb34-872bfa361bee',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'2aa38248-2dbc-4334-bc11-fa61ded98f5c',	'deposito',	'BANK NEGARA INDONESIA616020000000',	NULL,	'2023-08-28',	'2023-11-28',	'2023-11-28',	616020000000,	71,	6,	0.095427915,	45,	52192130,	'2023-10-26 15:02:28+00',	't',	'',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('8992c305-9c83-4c14-bf45-3e60a3d237ac',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	NULL,	'85b7239d-1c80-4ea5-bb34-872bfa361bee',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'879d0eab-54b2-42c3-97c4-d42f47d9207f',	'deposito',	'BANK NEGARA INDONESIA1600000000000',	NULL,	'2023-09-07',	'2023-10-07',	'2023-10-07',	1600000000000,	19,	5.9,	0.095427915,	45,	36279007,	'2023-10-26 15:02:28+00',	't',	'',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('07254f06-236c-40eb-b89a-95db7438a009',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	NULL,	'85b7239d-1c80-4ea5-bb34-872bfa361bee',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'879d0eab-54b2-42c3-97c4-d42f47d9207f',	'deposito',	'BANK NEGARA INDONESIA260020000000',	NULL,	'2023-09-08',	'2023-10-08',	'2023-10-08',	260020000000,	20,	5.9,	0.095427915,	45,	6206089,	'2023-10-26 15:02:28+00',	't',	'',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('5602975a-f125-463d-8994-a827f6a5ad86',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	NULL,	'85b7239d-1c80-4ea5-bb34-872bfa361bee',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'879d0eab-54b2-42c3-97c4-d42f47d9207f',	'deposito',	'BANK NEGARA INDONESIA1891420000000',	NULL,	'2023-09-11',	'2023-10-11',	'2023-10-11',	1891420000000,	23,	5.9,	0.095427915,	45,	51915294,	'2023-10-26 15:02:28+00',	't',	'',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('b410ccb6-0f1c-4f56-bad0-bbf51163315e',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	NULL,	'85b7239d-1c80-4ea5-bb34-872bfa361bee',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'879d0eab-54b2-42c3-97c4-d42f47d9207f',	'deposito',	'BANK NEGARA INDONESIA314520000000',	NULL,	'2023-09-13',	'2023-10-13',	'2023-10-13',	314520000000,	25,	5.9,	0.095427915,	45,	9383538,	'2023-10-26 15:02:28+00',	't',	'',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('75549067-4e9d-4cd0-b474-1fd3593cac64',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	NULL,	'85b7239d-1c80-4ea5-bb34-872bfa361bee',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'879d0eab-54b2-42c3-97c4-d42f47d9207f',	'deposito',	'BANK NEGARA INDONESIA246850000000',	NULL,	'2023-09-14',	'2023-10-14',	'2023-10-14',	246850000000,	26,	5.9,	0.095427915,	45,	7659215,	'2023-10-26 15:02:28+00',	't',	'',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('31a45f89-9125-4ca3-9b70-d3685bac9457',	'436d86b8-e47e-45e3-963e-f1eb72b54e2e',	NULL,	'85b7239d-1c80-4ea5-bb34-872bfa361bee',	'82a1ff1e-066e-424b-a77f-cc756c1a1865',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'879d0eab-54b2-42c3-97c4-d42f47d9207f',	'deposito',	'BANK NEGARA INDONESIA500000000000',	NULL,	'2023-09-18',	'2023-10-18',	'2023-10-18',	500000000000,	30,	5.9,	0.095427915,	45,	17900565,	'2023-10-26 15:02:28+00',	't',	'',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('7cd63882-9e77-47c2-b469-89048ca8dfce',	'7757ebfb-8fad-4023-b805-3903c04d44e8',	NULL,	'e8588c78-9d26-42b9-b1c5-8dd9caf89d7f',	'dbb9b64b-8fc9-40c3-b35c-54b35858dd85',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'2aa38248-2dbc-4334-bc11-fa61ded98f5c',	'sbn',	'BPD BENGKULU50000000000',	NULL,	'2023-07-03',	'2023-10-03',	'2023-10-03',	50000000000,	15,	6.25,	0.095427915,	45,	895046,	'2023-10-30 09:03:04+00',	't',	'',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('9792a586-0ed3-47c3-930d-dfa00d85c571',	'7757ebfb-8fad-4023-b805-3903c04d44e8',	NULL,	'e8588c78-9d26-42b9-b1c5-8dd9caf89d7f',	'dbb9b64b-8fc9-40c3-b35c-54b35858dd85',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'2aa38248-2dbc-4334-bc11-fa61ded98f5c',	'sbn',	'BPD BENGKULU68000000000',	NULL,	'2023-07-04',	'2023-10-04',	'2023-10-04',	68000000000,	16,	6.25,	0.095427915,	45,	1298412,	'2023-10-30 09:03:04+00',	't',	'',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('aaebdc3d-35fc-49fe-953c-7f81987d9b23',	'7757ebfb-8fad-4023-b805-3903c04d44e8',	NULL,	'e8588c78-9d26-42b9-b1c5-8dd9caf89d7f',	'dbb9b64b-8fc9-40c3-b35c-54b35858dd85',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'2aa38248-2dbc-4334-bc11-fa61ded98f5c',	'sbn',	'BPD BENGKULU55000000000',	NULL,	'2023-07-06',	'2023-10-06',	'2023-10-06',	55000000000,	18,	6.25,	0.095427915,	45,	1181456,	'2023-10-30 09:03:04+00',	't',	'',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('1c528395-39bc-405f-9c25-5bae6c29345a',	'7757ebfb-8fad-4023-b805-3903c04d44e8',	NULL,	'e8588c78-9d26-42b9-b1c5-8dd9caf89d7f',	'dbb9b64b-8fc9-40c3-b35c-54b35858dd85',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'2aa38248-2dbc-4334-bc11-fa61ded98f5c',	'sbn',	'BPD BENGKULU297000000000',	NULL,	'2023-07-10',	'2023-10-10',	'2023-10-10',	297000000000,	22,	6.25,	0.095427915,	45,	7797569,	'2023-10-30 09:03:04+00',	't',	'',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('da971062-2dd3-465a-928e-6ec0b873d8d5',	'9665c474-d464-432e-bf69-84f8e4f317ff',	NULL,	'e8588c78-9d26-42b9-b1c5-8dd9caf89d7f',	'dbb9b64b-8fc9-40c3-b35c-54b35858dd85',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'2aa38248-2dbc-4334-bc11-fa61ded98f5c',	'sbi',	'BPD BENGKULU50000000000',	NULL,	'2023-10-03',	'2023-12-03',	'2023-10-03',	50000000000,	15,	6.25,	0.095427915,	45,	895046,	'2023-10-30 15:11:05+00',	't',	'',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('0e89e12b-dda0-4df2-a15d-c9382138b7fa',	'9665c474-d464-432e-bf69-84f8e4f317ff',	NULL,	'e8588c78-9d26-42b9-b1c5-8dd9caf89d7f',	'dbb9b64b-8fc9-40c3-b35c-54b35858dd85',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'2aa38248-2dbc-4334-bc11-fa61ded98f5c',	'sbi',	'BPD BENGKULU68000000000',	NULL,	'2023-10-04',	'2023-12-04',	'2023-10-04',	68000000000,	16,	6.25,	0.095427915,	45,	1298412,	'2023-10-30 15:11:06+00',	't',	'',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('7c99534b-f414-4e22-a927-3d16bc2c2134',	'9665c474-d464-432e-bf69-84f8e4f317ff',	NULL,	'e8588c78-9d26-42b9-b1c5-8dd9caf89d7f',	'dbb9b64b-8fc9-40c3-b35c-54b35858dd85',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'2aa38248-2dbc-4334-bc11-fa61ded98f5c',	'obligasi',	'BPD BENGKULU55000000000',	NULL,	'2023-10-06',	'2023-12-06',	'2023-10-06',	55000000000,	18,	6.25,	0.095427915,	45,	1181456,	'2023-10-30 15:11:06+00',	't',	'',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('b0b620de-111e-4f85-89f9-d4baaf95a045',	'9665c474-d464-432e-bf69-84f8e4f317ff',	NULL,	'e8588c78-9d26-42b9-b1c5-8dd9caf89d7f',	'dbb9b64b-8fc9-40c3-b35c-54b35858dd85',	'c5b7a694-c7dc-4f71-b1de-d9e6051b5221',	'a355afc6-ef1a-491b-9c66-b4ba435668cf',	'2aa38248-2dbc-4334-bc11-fa61ded98f5c',	'obligasi',	'BPD BENGKULU297000000000',	NULL,	'2023-10-10',	'2023-12-10',	'2023-10-10',	297000000000,	22,	6.25,	0.095427915,	45,	7797569,	'2023-10-30 15:11:06+00',	't',	'',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625');

DROP TABLE IF EXISTS "trx_rekap";
CREATE TABLE "trx_rekap" (
    "id" uniqueidentifier DEFAULT NEWID() NOT NULL,
    "trx_porto_id" uniqueidentifier,
    "trx_twrr_id" uniqueidentifier,
    "tipe" varchar(25) NOT NULL,
    "tahun" varchar(4) NOT NULL,
    "bulan" varchar(2) NOT NULL,
    "end_year" smallint NOT NULL,
    "subtipe" varchar,
    "period" varchar NOT NULL,
    CONSTRAINT "trx_rekap_pkey" PRIMARY KEY ("id")
);

INSERT INTO "trx_rekap" ("id", "trx_porto_id", "trx_twrr_id", "tipe", "tahun", "bulan", "end_year", "subtipe", "period") VALUES
('eab7ea65-0431-4539-b007-2b32c263f7a3',	NULL,	'8bdbd29a-8b73-409e-a1eb-822e42d3c5a7',	'twrr',	'2021',	'12',	1,	NULL,	'2021-12'),
('efc42cc9-6315-4d4c-831f-c65d16cc7bdb',	'1bb957d5-1af2-42a6-8962-9285853c0000',	NULL,	'porto',	'2021',	'07',	0,	'sbn',	'2021-07'),
('6eaf6cf0-b9d1-47e7-9a01-0740237b9cf0',	'1bb957d5-1af2-42a6-8962-9285853c0000',	NULL,	'porto',	'2021',	'08',	0,	'sbn',	'2021-08'),
('b19244f3-a5b7-418c-871a-5dc38e532975',	'1bb957d5-1af2-42a6-8962-9285853c0000',	NULL,	'porto',	'2021',	'09',	0,	'sbn',	'2021-09'),
('e570fd11-4723-4343-8575-843784f78767',	'1bb957d5-1af2-42a6-8962-9285853c0000',	NULL,	'porto',	'2021',	'10',	0,	'sbn',	'2021-10'),
('af49e0f2-c425-4fe4-8003-a377b8253a39',	'1bb957d5-1af2-42a6-8962-9285853c0000',	NULL,	'porto',	'2021',	'11',	0,	'sbn',	'2021-11'),
('54098861-78a5-4d0b-9864-25c2fc62aa47',	NULL,	'c8b5faec-a021-44cb-8365-abc6ee399824',	'twrr',	'2022',	'12',	1,	NULL,	'2022-12'),
('46766949-075f-4f3e-87b7-cd2f7cff8c4b',	'1bb957d5-1af2-42a6-8962-9285853c0000',	NULL,	'porto',	'2022',	'01',	0,	'sbn',	'2022-01'),
('4e231be5-fb7d-4aae-b52b-8a79e84f69af',	'1bb957d5-1af2-42a6-8962-9285853c0000',	NULL,	'porto',	'2022',	'02',	0,	'sbn',	'2022-02'),
('4d606d60-cdef-44c0-bc5c-6248f65001f4',	'1bb957d5-1af2-42a6-8962-9285853c0000',	NULL,	'porto',	'2022',	'03',	0,	'sbn',	'2022-03'),
('6ac8e558-12bc-4df7-8838-6b8c7b287573',	'1bb957d5-1af2-42a6-8962-9285853c0000',	NULL,	'porto',	'2022',	'04',	0,	'sbn',	'2022-04'),
('e534c9bb-05e4-4c0c-ad1e-cc36f808a107',	'1bb957d5-1af2-42a6-8962-9285853c0000',	NULL,	'porto',	'2022',	'05',	0,	'sbn',	'2022-05'),
('f095a1ff-cbc0-4a83-99ff-90d4bc5c4ea1',	'1bb957d5-1af2-42a6-8962-9285853c0000',	NULL,	'porto',	'2021',	'12',	1,	'sbn',	'2021-12'),
('8610ac3e-d9b8-4fba-b355-329a709054e4',	'1bb957d5-1af2-42a6-8962-9285853c0000',	NULL,	'porto',	'2022',	'12',	1,	'sbn',	'2022-12'),
('a7a1d521-cd70-4465-8651-878a0af50ac7',	'1bb957d5-1af2-42a6-8962-9285853c0000',	NULL,	'porto',	'2022',	'06',	0,	'sbn',	'2022-06'),
('d9691216-c3ea-49d3-8673-b688ef879779',	'1bb957d5-1af2-42a6-8962-9285853c0000',	NULL,	'porto',	'2022',	'07',	0,	'sbn',	'2022-07'),
('caf3e6d2-edd7-47f2-af5f-c90afcbe561b',	'1bb957d5-1af2-42a6-8962-9285853c0000',	NULL,	'porto',	'2022',	'08',	0,	'sbn',	'2022-08'),
('17a50dbc-05ec-47c0-8099-588755a3af0f',	'1bb957d5-1af2-42a6-8962-9285853c0000',	NULL,	'porto',	'2022',	'09',	0,	'sbn',	'2022-09'),
('7a246946-8aeb-49a4-bd0e-f75a060a4273',	'1bb957d5-1af2-42a6-8962-9285853c0000',	NULL,	'porto',	'2022',	'10',	0,	'sbn',	'2022-10'),
('9ee663b0-2fd4-4eec-8eab-fb9c5eec0666',	'1bb957d5-1af2-42a6-8962-9285853c0000',	NULL,	'porto',	'2022',	'11',	0,	'sbn',	'2022-11'),
('a1fcce7a-7d7e-47c5-8ee7-ed7c8208aa10',	'1bb957d5-1af2-42a6-8962-9285853c0000',	NULL,	'porto',	'2023',	'12',	1,	'sbn',	'2023-12'),
('16ebd997-169f-4583-a0fd-6d7793f4f5cb',	'1bb957d5-1af2-42a6-8962-9285853c0000',	NULL,	'porto',	'2024',	'01',	0,	'sbn',	'2024-01'),
('a5f762e5-288b-4a48-90d9-3ef8d8f3dcba',	'1bb957d5-1af2-42a6-8962-9285853c0000',	NULL,	'porto',	'2024',	'02',	0,	'sbn',	'2024-02'),
('2819cd3e-076e-4b87-864b-f13a645021d0',	'1bb957d5-1af2-42a6-8962-9285853c0000',	NULL,	'porto',	'2024',	'03',	0,	'sbn',	'2024-03'),
('30a50e7b-6151-4374-bbd6-51379358bae6',	'1bb957d5-1af2-42a6-8962-9285853c0000',	NULL,	'porto',	'2024',	'04',	0,	'sbn',	'2024-04'),
('e727cd40-fd80-41c2-9485-0746a886ee9e',	'1bb957d5-1af2-42a6-8962-9285853c0000',	NULL,	'porto',	'2024',	'05',	0,	'sbn',	'2024-05'),
('30870bc9-13d0-4af6-80a3-47fa2383f1fa',	'1bb957d5-1af2-42a6-8962-9285853c0000',	NULL,	'porto',	'2024',	'06',	0,	'sbn',	'2024-06'),
('aa4daa08-4e7b-4132-b0b2-ec977551999d',	'10054a87-c046-4794-ba64-4b655a3ba34f',	NULL,	'porto',	'2023',	'12',	1,	'deposito',	'2023-12'),
('7eb3e0fb-3cbe-419c-9fe5-83786ac098a6',	'591a05b2-0186-4ed3-b9e7-16a07b1ac191',	NULL,	'porto',	'2023',	'12',	1,	'deposito',	'2023-12'),
('52092309-1a52-4285-a304-3138a45bf403',	NULL,	'e4df3418-cf89-4d40-b954-1225e1beb31b',	'twrr',	'2023',	'12',	1,	NULL,	'2023-12'),
('669c1133-cb66-4e0f-8c82-d3fc4a5bd257',	NULL,	'61e9aab8-c29b-4acf-a589-3c34291b62c8',	'twrr',	'2023',	'11',	0,	NULL,	'2023-11'),
('fa697f3d-ee4a-4007-b9c2-00d106cc6fc8',	'591a05b2-0186-4ed3-b9e7-16a07b1ac191',	NULL,	'porto',	'2023',	'09',	0,	'deposito',	'2023-09'),
('791ad17a-3c89-4718-9334-0cce15647ff5',	'040d2d97-e968-4374-b3af-d3f16649bab9',	NULL,	'porto',	'2023',	'09',	0,	'deposito',	'2023-09'),
('bee8f6e9-03fa-4e6c-ac18-40b2fdf7eb7c',	'f5996a23-b9c3-43ea-8e19-9bec7bb5cec8',	NULL,	'porto',	'2023',	'09',	0,	'deposito',	'2023-09'),
('4d365b04-d8da-43e7-901c-d1898f75eca7',	'44465596-acca-4471-9360-2cca0d978df4',	NULL,	'porto',	'2023',	'09',	0,	'deposito',	'2023-09'),
('ee9f1a1a-3e4b-4054-a3ac-b5195bc021d1',	'1c292470-bc06-4e72-a5a2-7dcba125a669',	NULL,	'porto',	'2023',	'09',	0,	'deposito',	'2023-09'),
('97e2e9d3-19e2-4813-8a47-f435b331497f',	'b68c79ee-5128-4040-8160-4b33e3dda27d',	NULL,	'porto',	'2023',	'09',	0,	'deposito',	'2023-09'),
('e77c77a7-74af-4365-8c5e-68363d669cd0',	'035ae0cc-80bb-4035-bb01-5ec24ad295f4',	NULL,	'porto',	'2023',	'08',	0,	'deposito',	'2023-08'),
('a14505a7-5246-4795-99d9-01ea4ec18e2f',	'035ae0cc-80bb-4035-bb01-5ec24ad295f4',	NULL,	'porto',	'2023',	'09',	0,	'deposito',	'2023-09'),
('5367f79f-17a7-45a5-8a27-ab1ba5c468f7',	'c326a148-511f-4bc7-a77d-5f9913e5a118',	NULL,	'porto',	'2023',	'09',	0,	'deposito',	'2023-09'),
('0d254f7d-c515-4d3c-a9f5-688b45b609e1',	'2fb1e176-29e9-43c7-ac44-078aefdb276c',	NULL,	'porto',	'2023',	'09',	0,	'deposito',	'2023-09'),
('6a07995c-3ed1-4cf7-8c31-c9461e2e3afa',	'b68c79ee-5128-4040-8160-4b33e3dda27d',	NULL,	'porto',	'2023',	'07',	0,	'deposito',	'2023-07'),
('a040f6a6-8775-4a67-87b9-eab62b78ea95',	'b68c79ee-5128-4040-8160-4b33e3dda27d',	NULL,	'porto',	'2023',	'08',	0,	'deposito',	'2023-08'),
('2a81a049-decc-4151-a9c7-011947942830',	'1bb957d5-1af2-42a6-8962-9285853c0000',	NULL,	'porto',	'2023',	'02',	0,	'sbn',	'2023-02'),
('6613f5bd-2df7-4786-80a5-5df1c0f72c17',	'1bb957d5-1af2-42a6-8962-9285853c0000',	NULL,	'porto',	'2023',	'03',	0,	'sbn',	'2023-03'),
('c5db3bcb-3ed5-4032-b79c-73c4183a559b',	'1bb957d5-1af2-42a6-8962-9285853c0000',	NULL,	'porto',	'2023',	'04',	0,	'sbn',	'2023-04'),
('f34e3a64-8a24-4a56-b7cd-3d4fe836d4a4',	'1bb957d5-1af2-42a6-8962-9285853c0000',	NULL,	'porto',	'2023',	'05',	0,	'sbn',	'2023-05'),
('1cbdd924-83d1-4a7a-a13f-7a675a5ed739',	'1bb957d5-1af2-42a6-8962-9285853c0000',	NULL,	'porto',	'2023',	'06',	0,	'sbn',	'2023-06'),
('f3ea0f9f-053e-4893-8f24-3da0260d554e',	'1bb957d5-1af2-42a6-8962-9285853c0000',	NULL,	'porto',	'2023',	'07',	0,	'sbn',	'2023-07'),
('f09ccffb-bdc9-4671-968d-d873b971a3d9',	'1bb957d5-1af2-42a6-8962-9285853c0000',	NULL,	'porto',	'2023',	'08',	0,	'sbn',	'2023-08'),
('9a7dff85-977e-4366-b9ad-bb79dbc44bc5',	'1bb957d5-1af2-42a6-8962-9285853c0000',	NULL,	'porto',	'2023',	'09',	0,	'sbn',	'2023-09'),
('73f7d513-4816-4279-8843-d3ff4bc4ac8d',	'a277cc05-4596-4bf3-ab45-9d2005397570',	NULL,	'porto',	'2023',	'07',	0,	'deposito',	'2023-07'),
('1e900199-60ff-40bc-9dcf-03c997a834fd',	'a277cc05-4596-4bf3-ab45-9d2005397570',	NULL,	'porto',	'2023',	'08',	0,	'deposito',	'2023-08'),
('299ca3f1-fa5d-44f1-8c55-c12b85ea4237',	'a277cc05-4596-4bf3-ab45-9d2005397570',	NULL,	'porto',	'2023',	'09',	0,	'deposito',	'2023-09'),
('722519e8-49b9-4b80-80b4-af0ad36e442b',	'5c8d3684-ebaa-4687-85ca-5cc5c5fe7333',	NULL,	'porto',	'2023',	'08',	0,	'deposito',	'2023-08'),
('c719ffaf-6b9d-4d84-b484-428115ea9b37',	'5c8d3684-ebaa-4687-85ca-5cc5c5fe7333',	NULL,	'porto',	'2023',	'09',	0,	'deposito',	'2023-09'),
('a8be1ef7-1c7b-4133-ab1c-b42585371ef0',	'c7448450-28bd-489e-a629-1bcae1610e12',	NULL,	'porto',	'2023',	'08',	0,	'deposito',	'2023-08'),
('e7116e3a-a4c5-4d1f-b6ae-7aaaf7bf680c',	'c7448450-28bd-489e-a629-1bcae1610e12',	NULL,	'porto',	'2023',	'09',	0,	'deposito',	'2023-09'),
('4a109f02-a276-4ae6-a85d-8631007c764b',	'10054a87-c046-4794-ba64-4b655a3ba34f',	NULL,	'porto',	'2023',	'09',	0,	'deposito',	'2023-09'),
('06bfebfb-7955-4a52-959a-d91c2b1d45ca',	'b79e996e-2a79-4a68-a208-8b03a7ae760b',	NULL,	'porto',	'2023',	'10',	0,	'deposito',	'2023-10'),
('e992ebf0-aa13-4bf2-811d-983010793d5b',	'1bb957d5-1af2-42a6-8962-9285853c0000',	NULL,	'porto',	'2023',	'10',	0,	'sbn',	'2023-10'),
('55dd8f47-44dd-4701-b386-732b42ac28d8',	'a277cc05-4596-4bf3-ab45-9d2005397570',	NULL,	'porto',	'2023',	'10',	0,	'deposito',	'2023-10'),
('cde96a9c-02b6-4d85-a90a-aea77e1511c1',	'5c8d3684-ebaa-4687-85ca-5cc5c5fe7333',	NULL,	'porto',	'2023',	'10',	0,	'deposito',	'2023-10'),
('886bd6d0-a968-4c90-be7b-d6dc552196d0',	'10054a87-c046-4794-ba64-4b655a3ba34f',	NULL,	'porto',	'2023',	'10',	0,	'deposito',	'2023-10'),
('ff48ca12-0b45-489a-a3dd-a30ddf56e53e',	'591a05b2-0186-4ed3-b9e7-16a07b1ac191',	NULL,	'porto',	'2023',	'10',	0,	'deposito',	'2023-10'),
('74e85003-aebe-4f53-8f09-8e2e9b429d20',	'44465596-acca-4471-9360-2cca0d978df4',	NULL,	'porto',	'2023',	'10',	0,	'deposito',	'2023-10'),
('fe9cb34f-22be-4295-a95f-9c5137a56d7c',	'1c292470-bc06-4e72-a5a2-7dcba125a669',	NULL,	'porto',	'2023',	'10',	0,	'deposito',	'2023-10'),
('604dae39-8e7a-443e-a9f4-c13be369a15c',	'b68c79ee-5128-4040-8160-4b33e3dda27d',	NULL,	'porto',	'2023',	'10',	0,	'deposito',	'2023-10'),
('41db5cd6-e540-4602-8c39-3bc37d44ff99',	'035ae0cc-80bb-4035-bb01-5ec24ad295f4',	NULL,	'porto',	'2023',	'10',	0,	'deposito',	'2023-10'),
('77d018c1-4c85-4b84-88d3-da1af0e2e620',	'c326a148-511f-4bc7-a77d-5f9913e5a118',	NULL,	'porto',	'2023',	'10',	0,	'deposito',	'2023-10'),
('7ce378bc-c88a-4608-be56-4a38fcc547ed',	'1bb957d5-1af2-42a6-8962-9285853c0000',	NULL,	'porto',	'2023',	'11',	0,	'sbn',	'2023-11'),
('ce408d97-e3c8-41d9-a033-e58dc1da4187',	'5c8d3684-ebaa-4687-85ca-5cc5c5fe7333',	NULL,	'porto',	'2023',	'11',	0,	'deposito',	'2023-11'),
('bee276c6-ed59-453a-aae5-578525b10acb',	'10054a87-c046-4794-ba64-4b655a3ba34f',	NULL,	'porto',	'2023',	'11',	0,	'deposito',	'2023-11'),
('b53f5855-5fb3-4de5-a303-255f5b08e39c',	'591a05b2-0186-4ed3-b9e7-16a07b1ac191',	NULL,	'porto',	'2023',	'11',	0,	'deposito',	'2023-11'),
('78c13d3c-f3cd-4d4b-bcce-acfdb454a544',	'035ae0cc-80bb-4035-bb01-5ec24ad295f4',	NULL,	'porto',	'2023',	'11',	0,	'deposito',	'2023-11'),
('5a54e2d3-b9ff-4ffc-861e-695618f3bbd8',	'e1b30d5a-a6a6-458e-abf4-c1c929d5ecd9',	NULL,	'porto',	'2023',	'11',	0,	'deposito',	'2023-11'),
('319acc93-ad78-49cd-9c7a-1c7e3e71ec18',	'c34c9242-b6f9-42ee-adc0-16b97c37005c',	NULL,	'porto',	'2023',	'11',	0,	'deposito',	'2023-11'),
('207fd03d-b9be-4bd5-b10d-aaf30dbc577f',	'12e773fc-1416-496c-bc00-1c940ed831ad',	NULL,	'porto',	'2023',	'11',	0,	'deposito',	'2023-11'),
('03d3cf28-067a-4788-9158-8614cfd7a8f8',	'b79e996e-2a79-4a68-a208-8b03a7ae760b',	NULL,	'porto',	'2023',	'07',	0,	'deposito',	'2023-07'),
('4faaac56-45ac-4a8b-a229-5eb75a6c1a59',	'b79e996e-2a79-4a68-a208-8b03a7ae760b',	NULL,	'porto',	'2023',	'08',	0,	'deposito',	'2023-08'),
('4669561d-9f00-4429-8317-6db88683447c',	'b79e996e-2a79-4a68-a208-8b03a7ae760b',	NULL,	'porto',	'2023',	'09',	0,	'deposito',	'2023-09'),
('bd143769-cfc5-4322-b9df-644f50207402',	'1bb957d5-1af2-42a6-8962-9285853c0000',	NULL,	'porto',	'2023',	'01',	0,	'sbn',	'2023-01'),
('0e568269-5a98-43ad-a898-e5be00e78c92',	'eed11178-4579-4a79-bd7a-9311cd15323d',	NULL,	'porto',	'2023',	'09',	0,	'deposito',	'2023-09'),
('679a9a80-7cb7-44d7-8db7-4b43e111b510',	'c34c9242-b6f9-42ee-adc0-16b97c37005c',	NULL,	'porto',	'2023',	'08',	0,	'deposito',	'2023-08'),
('aae02035-b00b-4c92-83a4-a51fe242fb1a',	'c34c9242-b6f9-42ee-adc0-16b97c37005c',	NULL,	'porto',	'2023',	'09',	0,	'deposito',	'2023-09'),
('f991f977-b97b-4dd1-a6c7-ef57eac3bec3',	'12e773fc-1416-496c-bc00-1c940ed831ad',	NULL,	'porto',	'2023',	'08',	0,	'deposito',	'2023-08'),
('d0deee81-7b76-4c0b-aafe-aaa15be4acb6',	'12e773fc-1416-496c-bc00-1c940ed831ad',	NULL,	'porto',	'2023',	'09',	0,	'deposito',	'2023-09'),
('899e5c0a-2269-43fd-973a-d738391baa6a',	'fdf299f0-4716-4202-86b2-72c4352f5554',	NULL,	'porto',	'2023',	'09',	0,	'deposito',	'2023-09'),
('e24ca95b-2741-45ec-9150-b403d4b26550',	'ea524b28-83f3-4c4a-a186-92887da4f59d',	NULL,	'porto',	'2023',	'09',	0,	'deposito',	'2023-09'),
('24f169b2-1465-43b7-8d0b-3be027712e4c',	'1934d9b6-41ee-4f2e-b4da-e46d67882960',	NULL,	'porto',	'2023',	'09',	0,	'deposito',	'2023-09'),
('f78a837d-a635-40d0-958c-b0ea9761ce79',	'54e19957-18a6-4ee6-bc4c-12145b5c5d75',	NULL,	'porto',	'2023',	'09',	0,	'deposito',	'2023-09'),
('1b227e73-b699-4451-9863-73134b48070d',	'cc9b4fc7-9e91-48c7-aed7-6de0e8b0d411',	NULL,	'porto',	'2023',	'09',	0,	'deposito',	'2023-09'),
('8a975d26-1e63-4cc9-9155-61846ec978b8',	'a942f1f3-9b27-44d1-9174-7d9a4b989505',	NULL,	'porto',	'2023',	'09',	0,	'deposito',	'2023-09'),
('9c865ffe-64da-4fd5-9d48-77482b15e938',	NULL,	'6bf58a14-382c-4c10-92fb-984a50300272',	'twrr',	'2023',	'10',	1,	NULL,	'2023-10'),
('109d8c48-a721-4f56-8bcc-0db3d2659bef',	'a6737e75-84bd-4c73-9db9-007389ca318f',	NULL,	'porto',	'2023',	'07',	0,	'obligasi',	'2023-07'),
('273616b9-b8b8-4fcf-8771-fd398e0a7f8d',	'a6737e75-84bd-4c73-9db9-007389ca318f',	NULL,	'porto',	'2023',	'08',	0,	'obligasi',	'2023-08'),
('8eaecd27-ce93-48c5-a1ce-0fc7b8835596',	'a6737e75-84bd-4c73-9db9-007389ca318f',	NULL,	'porto',	'2023',	'09',	0,	'obligasi',	'2023-09'),
('56acd7ae-37a7-4e85-88d8-17f0ea09005e',	'a6737e75-84bd-4c73-9db9-007389ca318f',	NULL,	'porto',	'2023',	'10',	1,	'obligasi',	'2023-10'),
('4916199c-3aa6-43e8-875c-7848cc93c3cd',	'f571f095-a760-46c0-a7a1-6145bc23f36d',	NULL,	'porto',	'2023',	'07',	0,	'obligasi',	'2023-07'),
('fe20a3f2-e367-4ceb-88c1-096872b1c4dc',	'f571f095-a760-46c0-a7a1-6145bc23f36d',	NULL,	'porto',	'2023',	'08',	0,	'obligasi',	'2023-08'),
('cd5f5ac8-429a-4776-bc47-d7e1ddcf44f3',	'f571f095-a760-46c0-a7a1-6145bc23f36d',	NULL,	'porto',	'2023',	'09',	0,	'obligasi',	'2023-09'),
('f1510634-b9f7-4234-94ca-d5ae8a204792',	'f571f095-a760-46c0-a7a1-6145bc23f36d',	NULL,	'porto',	'2023',	'10',	1,	'obligasi',	'2023-10'),
('0c559258-b144-4640-952b-8bd4cd8316ce',	'c850dd1b-7183-49ea-b1d5-976fea7a42a5',	NULL,	'porto',	'2023',	'10',	1,	'sbi',	'2023-10'),
('eea4f8d3-a05b-4536-b46c-9497501fbd38',	'c850dd1b-7183-49ea-b1d5-976fea7a42a5',	NULL,	'porto',	'2023',	'11',	0,	'sbi',	'2023-11'),
('dccb0c33-1f52-415c-b229-ef7739327f1a',	'c850dd1b-7183-49ea-b1d5-976fea7a42a5',	NULL,	'porto',	'2023',	'12',	1,	'sbi',	'2023-12'),
('02543329-1650-42de-8149-454494f13ba7',	'1b78e50a-59c2-4e2d-b0cc-84c0d2604f22',	NULL,	'porto',	'2023',	'10',	1,	'sbi',	'2023-10'),
('db51a9f7-2d7d-4142-8fd0-64f1fab0bd9c',	'1b78e50a-59c2-4e2d-b0cc-84c0d2604f22',	NULL,	'porto',	'2023',	'11',	0,	'sbi',	'2023-11'),
('23545a46-983f-4ea1-8662-09bc3d891509',	'1b78e50a-59c2-4e2d-b0cc-84c0d2604f22',	NULL,	'porto',	'2023',	'12',	1,	'sbi',	'2023-12'),
('c50c3d0a-63c3-40ac-80fb-084a71a7d7dd',	'c7577956-a911-407c-9308-bcc5c8e6667f',	NULL,	'porto',	'2023',	'10',	1,	'obligasi',	'2023-10'),
('499063d1-7f44-45e7-be51-75dd0da52895',	'c7577956-a911-407c-9308-bcc5c8e6667f',	NULL,	'porto',	'2023',	'11',	0,	'obligasi',	'2023-11'),
('ce2961f7-66df-46e2-bd03-a47d478fd336',	'c7577956-a911-407c-9308-bcc5c8e6667f',	NULL,	'porto',	'2023',	'12',	1,	'obligasi',	'2023-12'),
('b4256207-7d03-4fbc-b2e8-b13eccb5dad0',	'32c17312-9f80-4ced-b0ea-dffd49c431fb',	NULL,	'porto',	'2023',	'10',	1,	'obligasi',	'2023-10'),
('96afe979-58db-4ab3-a116-082d673a982c',	'32c17312-9f80-4ced-b0ea-dffd49c431fb',	NULL,	'porto',	'2023',	'11',	0,	'obligasi',	'2023-11'),
('7ceb44cf-bc91-4433-b0c9-87c9456ca827',	'32c17312-9f80-4ced-b0ea-dffd49c431fb',	NULL,	'porto',	'2023',	'12',	1,	'obligasi',	'2023-12'),
('2b0f33fd-b26e-4661-96fb-0a3224e39006',	'e6aca377-99c9-45c1-938b-c2e46de2c16a',	NULL,	'porto',	'2023',	'07',	0,	'sbi',	'2023-07'),
('f22d6ba7-453c-4b48-b714-7f60fa8134e8',	'e6aca377-99c9-45c1-938b-c2e46de2c16a',	NULL,	'porto',	'2023',	'08',	0,	'sbi',	'2023-08'),
('09805bcb-5f11-41d6-81e8-1e15d90be2ac',	'e6aca377-99c9-45c1-938b-c2e46de2c16a',	NULL,	'porto',	'2023',	'09',	0,	'sbi',	'2023-09'),
('0eab322c-5e05-4b4a-8550-b413f5a1b11f',	'e6aca377-99c9-45c1-938b-c2e46de2c16a',	NULL,	'porto',	'2023',	'10',	1,	'sbi',	'2023-10'),
('f72ac802-0fe6-4155-a12e-d7309f2e59c3',	'a82840e2-ac32-48e1-b8a5-f9f819197c38',	NULL,	'porto',	'2023',	'07',	0,	'sbi',	'2023-07'),
('4b245b12-ef1b-4361-aaab-c3d6ffd3d373',	'a82840e2-ac32-48e1-b8a5-f9f819197c38',	NULL,	'porto',	'2023',	'08',	0,	'sbi',	'2023-08'),
('af56c544-6264-4eb4-9f41-f6d74f763130',	'a82840e2-ac32-48e1-b8a5-f9f819197c38',	NULL,	'porto',	'2023',	'09',	0,	'sbi',	'2023-09'),
('b94e0177-88c0-4b1f-afd5-89c87d0fa9df',	'a82840e2-ac32-48e1-b8a5-f9f819197c38',	NULL,	'porto',	'2023',	'10',	1,	'sbi',	'2023-10'),
('f48a0945-6f05-4851-a4c0-9b8dcad31170',	'2fb1e176-29e9-43c7-ac44-078aefdb276c',	NULL,	'porto',	'2023',	'10',	0,	'deposito',	'2023-10'),
('712d9c48-7d5c-4dbd-adc6-8a0cbf6a5838',	'e1b30d5a-a6a6-458e-abf4-c1c929d5ecd9',	NULL,	'porto',	'2023',	'10',	0,	'deposito',	'2023-10'),
('28a9b298-d1e4-4b21-997a-d4ba2017818d',	'c34c9242-b6f9-42ee-adc0-16b97c37005c',	NULL,	'porto',	'2023',	'10',	0,	'deposito',	'2023-10'),
('929a1dfc-f03f-4b9d-b69c-65d63f4abecb',	'12e773fc-1416-496c-bc00-1c940ed831ad',	NULL,	'porto',	'2023',	'10',	0,	'deposito',	'2023-10'),
('f7ec49bf-2e41-4507-b976-dca44f2c4e35',	'fdf299f0-4716-4202-86b2-72c4352f5554',	NULL,	'porto',	'2023',	'10',	0,	'deposito',	'2023-10'),
('80719a08-7ed9-461a-9478-fe0ca4533f5e',	'ea524b28-83f3-4c4a-a186-92887da4f59d',	NULL,	'porto',	'2023',	'10',	0,	'deposito',	'2023-10'),
('69b8043b-6189-40e7-a711-f5e57a57dc4f',	'1934d9b6-41ee-4f2e-b4da-e46d67882960',	NULL,	'porto',	'2023',	'10',	0,	'deposito',	'2023-10'),
('3dfbf0e4-491d-4859-86d1-fa746002e945',	'54e19957-18a6-4ee6-bc4c-12145b5c5d75',	NULL,	'porto',	'2023',	'10',	0,	'deposito',	'2023-10'),
('bae1cdb7-b988-4ad4-9c5c-273f864e0b1a',	'cc9b4fc7-9e91-48c7-aed7-6de0e8b0d411',	NULL,	'porto',	'2023',	'10',	0,	'deposito',	'2023-10'),
('982e30f8-3f65-46f6-9f75-823dafc65691',	'a942f1f3-9b27-44d1-9174-7d9a4b989505',	NULL,	'porto',	'2023',	'10',	0,	'deposito',	'2023-10'),
('2f2a90e9-0254-4c82-9e28-58cf62fd6a3e',	'e1b30d5a-a6a6-458e-abf4-c1c929d5ecd9',	NULL,	'porto',	'2023',	'08',	0,	'deposito',	'2023-08'),
('939d0134-86ba-4867-b061-492288039ed3',	'e1b30d5a-a6a6-458e-abf4-c1c929d5ecd9',	NULL,	'porto',	'2023',	'09',	0,	'deposito',	'2023-09'),
('ac9d8a6e-fe85-44ec-be4b-1fe37df5031d',	'eed11178-4579-4a79-bd7a-9311cd15323d',	NULL,	'porto',	'2023',	'08',	0,	'deposito',	'2023-08');

DROP TABLE IF EXISTS "trx_twrr";
CREATE TABLE "trx_twrr" (
    "id" uniqueidentifier NOT NULL,
    "trx_twrr_file_id" uniqueidentifier NOT NULL,
    "tanggal" date NOT NULL,
    "adjustment_cf" numeric(19,0) NOT NULL,
    "as1" numeric(19,0) NOT NULL,
    "as2" numeric(19,0) NOT NULL,
    "as3" numeric(19,0) NOT NULL,
    "as4" numeric(19,0) NOT NULL,
    "as5" numeric(19,0),
    "as6" numeric(19,0),
    "as7" numeric(19,0),
    "as8" numeric(19,0),
    "as9" numeric(19,0),
    "as10" numeric(19,0),
    "li1" numeric(19,0) NOT NULL,
    "li2" numeric(19,0) NOT NULL,
    "li3" numeric(19,0) NOT NULL,
    "li4" numeric(19,0) NOT NULL,
    "li5" numeric(19,0) NOT NULL,
    "li6" numeric(19,0),
    "li7" numeric(19,0),
    "li8" numeric(19,0),
    "li9" numeric(19,0),
    "li10" numeric(19,0),
    "total_before_cash" numeric(19,0) NOT NULL,
    "total_after_cash" numeric(19,0) NOT NULL,
    "return_harian" real NOT NULL,
    "return_akumulasi" real NOT NULL,
    "created_at" DATETIMEOFFSET NOT NULL,
    "updated_at" DATETIMEOFFSET,
    "mst_bank_custody_id" uniqueidentifier,
    CONSTRAINT "trx_twrr_pkey" PRIMARY KEY ("id")
);

INSERT INTO "trx_twrr" ("id", "trx_twrr_file_id", "tanggal", "adjustment_cf", "as1", "as2", "as3", "as4", "as5", "as6", "as7", "as8", "as9", "as10", "li1", "li2", "li3", "li4", "li5", "li6", "li7", "li8", "li9", "li10", "total_before_cash", "total_after_cash", "return_harian", "return_akumulasi", "created_at", "updated_at", "mst_bank_custody_id") VALUES
('8bdbd29a-8b73-409e-a1eb-822e42d3c5a7',	'a3f35ae5-f0eb-47de-b1ff-7b05d5f2ba4c',	'2021-12-31',	0,	23705510,	89410562000000,	8060382640394,	555258,	534179961506,	9630891643,	0,	0,	NULL,	NULL,	808521621,	0,	0,	306044394233,	0,	NULL,	NULL,	NULL,	NULL,	NULL,	97707926838457,	97707926838457,	0,	0,	'2023-10-30 03:51:54+00',	NULL,	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('c8b5faec-a021-44cb-8365-abc6ee399824',	'a3f35ae5-f0eb-47de-b1ff-7b05d5f2ba4c',	'2022-12-31',	0,	18406217,	90077612000000,	8060990881505,	555583,	517812874040,	10043927938,	0,	0,	NULL,	NULL,	927377291,	0,	0,	289929197929,	0,	NULL,	NULL,	NULL,	NULL,	NULL,	98375622070063,	98375622070063,	0.683358,	0.683358,	'2023-10-30 03:51:54+00',	NULL,	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('70f4d3aa-db1a-4df5-a370-c6073ae899a5',	'52eb37e4-5afd-47b2-ab3f-6990fbe398c7',	'2023-10-01',	0,	146508432,	86177042000000,	6077410900499,	0,	440143047955,	7347826087,	0,	0,	NULL,	NULL,	3507668974,	0,	0,	192171855658,	0,	NULL,	NULL,	NULL,	NULL,	NULL,	92506410758341,	92506410758341,	0,	0,	'2023-10-27 14:32:00+00',	'2023-10-27 14:34:19+00',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('a26ed8c8-8c11-4f8a-8994-a5515801cc81',	'52eb37e4-5afd-47b2-ab3f-6990fbe398c7',	'2023-10-02',	0,	3398167300,	86177042000000,	6078444032052,	4013,	468818205791,	7434782608,	0,	0,	NULL,	NULL,	225056692,	0,	0,	198931183500,	0,	NULL,	NULL,	NULL,	NULL,	NULL,	92535980951572,	92535980951572,	0.0319656,	0.0319656,	'2023-10-27 14:32:00+00',	'2023-10-27 14:34:19+00',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('1c798ea1-6443-4e3d-a226-b8da8dffcf0e',	'52eb37e4-5afd-47b2-ab3f-6990fbe398c7',	'2023-10-03',	0,	9322333655,	86177042000000,	6078960187201,	190214,	482525647722,	7478260869,	0,	0,	NULL,	NULL,	337621008,	0,	0,	204225212869,	0,	NULL,	NULL,	NULL,	NULL,	NULL,	92550765785784,	92550765785784,	0.0479481,	0.0799137,	'2023-10-27 14:32:01+00',	'2023-10-27 14:34:19+00',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('57e81b02-69a3-4ca2-b751-79a4f8170700',	'52eb37e4-5afd-47b2-ab3f-6990fbe398c7',	'2023-10-04',	0,	3202100605,	86188282000000,	6079477846072,	956434,	494622336229,	7521739130,	0,	0,	NULL,	NULL,	450203310,	0,	0,	207467695150,	0,	NULL,	NULL,	NULL,	NULL,	NULL,	92565189080010,	92565189080010,	0.0635397,	0.143453,	'2023-10-27 14:32:01+00',	'2023-10-27 14:34:19+00',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('730e7d53-7a8e-47c8-9159-b6feb515ca6f',	'52eb37e4-5afd-47b2-ab3f-6990fbe398c7',	'2023-10-05',	0,	1399764990,	86325362000000,	5950759811611,	1131891,	508969603640,	7565217391,	0,	0,	NULL,	NULL,	562803156,	0,	0,	213510359535,	0,	NULL,	NULL,	NULL,	NULL,	NULL,	92579984366832,	92579984366832,	0.0795335,	0.222987,	'2023-10-27 14:32:01+00',	'2023-10-27 14:34:20+00',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('61e9aab8-c29b-4acf-a589-3c34291b62c8',	'52eb37e4-5afd-47b2-ab3f-6990fbe398c7',	'2023-11-06',	733100000000,	6945953916,	87068362000000,	5951265540266,	1208591,	515269186174,	7608695652,	0,	0,	NULL,	NULL,	675421000,	0,	0,	220896654055,	0,	NULL,	NULL,	NULL,	NULL,	NULL,	92594780509544,	93327880509544,	0.015982,	0.015982,	'2023-10-27 14:32:01+00',	'2023-10-27 14:34:20+00',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('e4df3418-cf89-4d40-b954-1225e1beb31b',	'52eb37e4-5afd-47b2-ab3f-6990fbe398c7',	'2023-12-01',	0,	347222635,	64134700000000,	643529458839,	703107195,	247487051368,	2600000,	0,	0,	NULL,	NULL,	1311300199,	0,	0,	176079533707,	0,	NULL,	NULL,	NULL,	NULL,	NULL,	64849378606131,	64849378606131,	-29.9531,	-29.9531,	'2023-10-27 14:32:01+00',	'2023-10-27 14:34:20+00',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625'),
('6bf58a14-382c-4c10-92fb-984a50300272',	'52eb37e4-5afd-47b2-ab3f-6990fbe398c7',	'2023-10-06',	0,	1399764990,	86325362000000,	5950759811611,	1131891,	508969603640,	7565217391,	0,	0,	NULL,	NULL,	562803156,	0,	0,	213510359535,	0,	NULL,	NULL,	NULL,	NULL,	NULL,	92579984366832,	92579984366832,	0.0795335,	0.302521,	'2023-10-27 14:32:01+00',	'2023-10-27 14:34:20+00',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625');

DROP TABLE IF EXISTS "trx_twrr_file";
CREATE TABLE "trx_twrr_file" (
    "id" uniqueidentifier NOT NULL,
    "file_name" varchar(255) NOT NULL,
    "status" BIT NOT NULL,
    "created_at" DATETIMEOFFSET NOT NULL,
    "aut_user_id" uniqueidentifier,
    CONSTRAINT "trx_twrr_file_pkey" PRIMARY KEY ("id")
);

INSERT INTO "trx_twrr_file" ("id", "file_name", "status", "created_at", "aut_user_id") VALUES
('2f73d137-92a3-4bfd-98d5-c0ca1f4a87d9',	'upload_twrr_sample.xlsx',	't',	'2023-10-27 14:32:00+00',	'1842cc9c-24b9-4da9-8f77-cfb797c62e4f'),
('52eb37e4-5afd-47b2-ab3f-6990fbe398c7',	'upload_twrr_sample.xlsx',	't',	'2023-10-27 14:34:19+00',	'1842cc9c-24b9-4da9-8f77-cfb797c62e4f'),
('a3f35ae5-f0eb-47de-b1ff-7b05d5f2ba4c',	'upload_twrr_sample_20212022.xlsx',	't',	'2023-10-30 03:51:54+00',	'd81b9f19-7386-4204-9f10-80b8e27484f6'),
('6df84ec2-45dc-44d7-9169-b45b55a7dc72',	'upload_twrr_sample_augsep.xlsx',	'f',	'2023-10-30 09:11:06+00',	'd81b9f19-7386-4204-9f10-80b8e27484f6');

DROP TABLE IF EXISTS "trx_twrr_filedata";
CREATE TABLE "trx_twrr_filedata" (
    "id" uniqueidentifier DEFAULT NEWID() NOT NULL,
    "trx_twrr_file_id" uniqueidentifier NOT NULL,
    "trx_twrr_id" uniqueidentifier,
    "tanggal" date,
    "adjustment_cf" numeric(19,0) NOT NULL,
    "as1" numeric(19,0) NOT NULL,
    "as2" numeric(19,0) NOT NULL,
    "as3" numeric(19,0) NOT NULL,
    "as4" numeric(19,0) NOT NULL,
    "as5" numeric(19,0) NOT NULL,
    "as6" numeric(19,0),
    "as7" numeric(19,0),
    "as8" numeric(19,0),
    "as9" numeric(19,0),
    "as10" numeric(19,0),
    "li1" numeric(19,0) NOT NULL,
    "li2" numeric(19,0) NOT NULL,
    "li3" numeric(19,0) NOT NULL,
    "li4" numeric(19,0) NOT NULL,
    "li5" numeric(19,0) NOT NULL,
    "li6" numeric(19,0),
    "li7" numeric(19,0),
    "li8" numeric(19,0),
    "li9" numeric(19,0),
    "li10" numeric(19,0),
    "total_before_cash" numeric(19,0) NOT NULL,
    "total_after_cash" numeric(19,0) NOT NULL,
    "return_harian" real NOT NULL,
    "return_akumulasi" real NOT NULL,
    "created_at" DATETIMEOFFSET NOT NULL,
    "mst_bank_custody_id" uniqueidentifier,
    "status" BIT DEFAULT 1,
    "note" text,
    CONSTRAINT "trx_twrr_filedata_pkey" PRIMARY KEY ("id")
);

INSERT INTO "trx_twrr_filedata" ("id", "trx_twrr_file_id", "trx_twrr_id", "tanggal", "adjustment_cf", "as1", "as2", "as3", "as4", "as5", "as6", "as7", "as8", "as9", "as10", "li1", "li2", "li3", "li4", "li5", "li6", "li7", "li8", "li9", "li10", "total_before_cash", "total_after_cash", "return_harian", "return_akumulasi", "created_at", "mst_bank_custody_id", "status", "note") VALUES
('6e480159-fefd-4a9f-af26-f6c185f95fe4',	'2f73d137-92a3-4bfd-98d5-c0ca1f4a87d9',	NULL,	'2023-10-01',	0,	146508432,	86177042000000,	6077410900499,	0,	440143047955,	7347826087,	0,	0,	NULL,	NULL,	3507668974,	0,	0,	192171855658,	0,	NULL,	NULL,	NULL,	NULL,	NULL,	92506410758341,	92506410758341,	0,	0,	'2023-10-27 14:32:00+00',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625',	't',	''),
('669342b7-ea57-449e-8609-6750ef73bc16',	'2f73d137-92a3-4bfd-98d5-c0ca1f4a87d9',	NULL,	'2023-10-02',	0,	3398167300,	86177042000000,	6078444032052,	4013,	468818205791,	7434782608,	0,	0,	NULL,	NULL,	225056692,	0,	0,	198931183500,	0,	NULL,	NULL,	NULL,	NULL,	NULL,	92535980951572,	92535980951572,	0.0319656,	0.0319656,	'2023-10-27 14:32:00+00',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625',	't',	''),
('116449a9-8ef2-4f0b-a690-28e2e1d99462',	'2f73d137-92a3-4bfd-98d5-c0ca1f4a87d9',	NULL,	'2023-10-03',	0,	9322333655,	86177042000000,	6078960187201,	190214,	482525647722,	7478260869,	0,	0,	NULL,	NULL,	337621008,	0,	0,	204225212869,	0,	NULL,	NULL,	NULL,	NULL,	NULL,	92550765785784,	92550765785784,	0.0479481,	0.0799137,	'2023-10-27 14:32:01+00',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625',	't',	''),
('fb5c841d-678e-4fcd-86de-4f7c374f8a3b',	'2f73d137-92a3-4bfd-98d5-c0ca1f4a87d9',	NULL,	'2023-10-04',	0,	3202100605,	86188282000000,	6079477846072,	956434,	494622336229,	7521739130,	0,	0,	NULL,	NULL,	450203310,	0,	0,	207467695150,	0,	NULL,	NULL,	NULL,	NULL,	NULL,	92565189080010,	92565189080010,	0.0635397,	0.143453,	'2023-10-27 14:32:01+00',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625',	't',	''),
('478aff81-a58c-4602-9499-372560e56fd5',	'2f73d137-92a3-4bfd-98d5-c0ca1f4a87d9',	NULL,	'2023-10-05',	0,	1399764990,	86325362000000,	5950759811611,	1131891,	508969603640,	7565217391,	0,	0,	NULL,	NULL,	562803156,	0,	0,	213510359535,	0,	NULL,	NULL,	NULL,	NULL,	NULL,	92579984366832,	92579984366832,	0.0795335,	0.222987,	'2023-10-27 14:32:01+00',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625',	't',	''),
('87063274-833c-4981-9ef5-867c6ecc4e95',	'2f73d137-92a3-4bfd-98d5-c0ca1f4a87d9',	NULL,	'2023-11-06',	733100000000,	6945953916,	87068362000000,	5951265540266,	1208591,	515269186174,	7608695652,	0,	0,	NULL,	NULL,	675421000,	0,	0,	220896654055,	0,	NULL,	NULL,	NULL,	NULL,	NULL,	92594780509544,	93327880509544,	0.0955282,	0.0955282,	'2023-10-27 14:32:01+00',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625',	't',	''),
('d1330318-ad81-41bf-9529-b2b077d8e584',	'2f73d137-92a3-4bfd-98d5-c0ca1f4a87d9',	NULL,	'2023-12-01',	0,	347222635,	64134700000000,	643529458839,	703107195,	247487051368,	2600000,	0,	0,	NULL,	NULL,	1311300199,	0,	0,	176079533707,	0,	NULL,	NULL,	NULL,	NULL,	NULL,	64849378606131,	64849378606131,	-29.8974,	-29.8974,	'2023-10-27 14:32:01+00',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625',	't',	''),
('8bc12b21-4082-4d02-ac00-979bde2d3074',	'2f73d137-92a3-4bfd-98d5-c0ca1f4a87d9',	NULL,	'2023-10-06',	0,	1399764990,	86325362000000,	5950759811611,	1131891,	508969603640,	7565217391,	0,	0,	NULL,	NULL,	562803156,	0,	0,	213510359535,	0,	NULL,	NULL,	NULL,	NULL,	NULL,	92579984366832,	92579984366832,	0.0795335,	0.302521,	'2023-10-27 14:32:01+00',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625',	't',	''),
('d182d5fb-aa37-4ddc-8654-1570189b99da',	'52eb37e4-5afd-47b2-ab3f-6990fbe398c7',	NULL,	'2023-10-01',	0,	146508432,	86177042000000,	6077410900499,	0,	440143047955,	7347826087,	0,	0,	NULL,	NULL,	3507668974,	0,	0,	192171855658,	0,	NULL,	NULL,	NULL,	NULL,	NULL,	92506410758341,	92506410758341,	0,	0,	'2023-10-27 14:34:19+00',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625',	't',	''),
('6a0b0ac1-0054-4b90-aaa2-f1cf3fd466d2',	'52eb37e4-5afd-47b2-ab3f-6990fbe398c7',	NULL,	'2023-10-02',	0,	3398167300,	86177042000000,	6078444032052,	4013,	468818205791,	7434782608,	0,	0,	NULL,	NULL,	225056692,	0,	0,	198931183500,	0,	NULL,	NULL,	NULL,	NULL,	NULL,	92535980951572,	92535980951572,	0.0319656,	0.0319656,	'2023-10-27 14:34:19+00',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625',	't',	''),
('e0633c6a-60ea-4950-afcc-dc99a2df362f',	'52eb37e4-5afd-47b2-ab3f-6990fbe398c7',	NULL,	'2023-10-03',	0,	9322333655,	86177042000000,	6078960187201,	190214,	482525647722,	7478260869,	0,	0,	NULL,	NULL,	337621008,	0,	0,	204225212869,	0,	NULL,	NULL,	NULL,	NULL,	NULL,	92550765785784,	92550765785784,	0.0479481,	0.0799137,	'2023-10-27 14:34:19+00',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625',	't',	''),
('2db2fcdf-770f-4a61-96e0-844050eb1ad0',	'52eb37e4-5afd-47b2-ab3f-6990fbe398c7',	NULL,	'2023-10-04',	0,	3202100605,	86188282000000,	6079477846072,	956434,	494622336229,	7521739130,	0,	0,	NULL,	NULL,	450203310,	0,	0,	207467695150,	0,	NULL,	NULL,	NULL,	NULL,	NULL,	92565189080010,	92565189080010,	0.0635397,	0.143453,	'2023-10-27 14:34:19+00',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625',	't',	''),
('53d9361c-3708-49f8-86f5-cd04be03d019',	'52eb37e4-5afd-47b2-ab3f-6990fbe398c7',	NULL,	'2023-10-05',	0,	1399764990,	86325362000000,	5950759811611,	1131891,	508969603640,	7565217391,	0,	0,	NULL,	NULL,	562803156,	0,	0,	213510359535,	0,	NULL,	NULL,	NULL,	NULL,	NULL,	92579984366832,	92579984366832,	0.0795335,	0.222987,	'2023-10-27 14:34:20+00',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625',	't',	''),
('580bb265-6d59-4f3a-8ccb-59f83c4b6410',	'52eb37e4-5afd-47b2-ab3f-6990fbe398c7',	NULL,	'2023-11-06',	733100000000,	6945953916,	87068362000000,	5951265540266,	1208591,	515269186174,	7608695652,	0,	0,	NULL,	NULL,	675421000,	0,	0,	220896654055,	0,	NULL,	NULL,	NULL,	NULL,	NULL,	92594780509544,	93327880509544,	0.015982,	0.015982,	'2023-10-27 14:34:20+00',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625',	't',	''),
('1cfc1e15-7c9b-4684-a15a-951c1be34c45',	'52eb37e4-5afd-47b2-ab3f-6990fbe398c7',	NULL,	'2023-12-01',	0,	347222635,	64134700000000,	643529458839,	703107195,	247487051368,	2600000,	0,	0,	NULL,	NULL,	1311300199,	0,	0,	176079533707,	0,	NULL,	NULL,	NULL,	NULL,	NULL,	64849378606131,	64849378606131,	-29.9531,	-29.9531,	'2023-10-27 14:34:20+00',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625',	't',	''),
('08a11f67-957c-4a05-bd19-17482300e803',	'52eb37e4-5afd-47b2-ab3f-6990fbe398c7',	NULL,	'2023-10-06',	0,	1399764990,	86325362000000,	5950759811611,	1131891,	508969603640,	7565217391,	0,	0,	NULL,	NULL,	562803156,	0,	0,	213510359535,	0,	NULL,	NULL,	NULL,	NULL,	NULL,	92579984366832,	92579984366832,	0.0795335,	0.302521,	'2023-10-27 14:34:20+00',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625',	't',	''),
('38b37eac-336d-4f7e-81e5-bc2edcbacb41',	'a3f35ae5-f0eb-47de-b1ff-7b05d5f2ba4c',	NULL,	'2021-12-31',	0,	23705510,	89410562000000,	8060382640394,	555258,	534179961506,	9630891643,	0,	0,	NULL,	NULL,	808521621,	0,	0,	306044394233,	0,	NULL,	NULL,	NULL,	NULL,	NULL,	97707926838457,	97707926838457,	0,	0,	'2023-10-30 03:51:54+00',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625',	't',	''),
('6a417261-ac2f-4759-9f1e-2df59b0810ad',	'a3f35ae5-f0eb-47de-b1ff-7b05d5f2ba4c',	NULL,	'2022-12-31',	0,	18406217,	90077612000000,	8060990881505,	555583,	517812874040,	10043927938,	0,	0,	NULL,	NULL,	927377291,	0,	0,	289929197929,	0,	NULL,	NULL,	NULL,	NULL,	NULL,	98375622070063,	98375622070063,	0.683358,	0.683358,	'2023-10-30 03:51:54+00',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625',	't',	''),
('fe56241d-1c7c-42b8-a866-2c6cdaf662a4',	'6df84ec2-45dc-44d7-9169-b45b55a7dc72',	NULL,	'2023-08-31',	0,	146508432,	86177042000000,	6077410900499,	0,	440143047955,	7347826087,	0,	0,	NULL,	NULL,	3507668974,	0,	0,	192171855658,	0,	NULL,	NULL,	NULL,	NULL,	NULL,	92506410758341,	92506410758341,	-5.32354,	-5.32354,	'2023-10-30 09:11:06+00',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625',	't',	''),
('6f4cf7ad-2bd7-4d83-bd6a-54b7aa0badbb',	'6df84ec2-45dc-44d7-9169-b45b55a7dc72',	NULL,	NULL,	0,	3398167300,	86177042000000,	6078444032052,	4013,	468818205791,	7434782608,	0,	0,	NULL,	NULL,	225056692,	0,	0,	198931183500,	0,	NULL,	NULL,	NULL,	NULL,	NULL,	0,	0,	0,	0,	'2023-10-30 09:11:06+00',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625',	'f',	'Invalid Date. '),
('39144d56-a9dc-4192-9179-44970c43a6f5',	'6df84ec2-45dc-44d7-9169-b45b55a7dc72',	NULL,	'2023-10-31',	0,	9322333655,	86177042000000,	6078960187201,	190214,	482525647722,	7478260869,	0,	0,	NULL,	NULL,	337621008,	0,	0,	204225212869,	0,	NULL,	NULL,	NULL,	NULL,	NULL,	92550765785784,	92550765785784,	-5.27814,	-4.97562,	'2023-10-30 09:11:06+00',	'0b6f869d-0cbc-4e60-8f5c-ef0e49544625',	'f',	'');

ALTER TABLE "aut_group_access" ADD CONSTRAINT "fkaut_group_261512" FOREIGN KEY (aut_access_id) REFERENCES aut_access(id) ;
ALTER TABLE "aut_group_access" ADD CONSTRAINT "fkaut_group_812836" FOREIGN KEY (aut_group_id) REFERENCES aut_group(id) ;

ALTER TABLE "aut_user" ADD CONSTRAINT "aut_user_mst_bank_custody_id_fkey" FOREIGN KEY (mst_bank_custody_id) REFERENCES mst_bank_custody(id) ;
ALTER TABLE "aut_user" ADD CONSTRAINT "fkaut_user872028" FOREIGN KEY (aut_group_id) REFERENCES aut_group(id) ;

ALTER TABLE "mst_issuer" ADD CONSTRAINT "fkmst_issuer954897" FOREIGN KEY (mst_rating_id) REFERENCES mst_rating(id) ;

ALTER TABLE "trx_porto" ADD CONSTRAINT "fktrx_porto247998" FOREIGN KEY (mst_pengelolaan_id) REFERENCES mst_pengelolaan(id) ;
ALTER TABLE "trx_porto" ADD CONSTRAINT "fktrx_porto344712" FOREIGN KEY (mst_tenor_id) REFERENCES mst_tenor(id) ;
ALTER TABLE "trx_porto" ADD CONSTRAINT "fktrx_porto54525" FOREIGN KEY (trx_porto_file_id) REFERENCES trx_porto_file(id) ;
ALTER TABLE "trx_porto" ADD CONSTRAINT "fktrx_porto594059" FOREIGN KEY (mst_issuer_id) REFERENCES mst_issuer(id) ;
ALTER TABLE "trx_porto" ADD CONSTRAINT "trx_porto_mst_bank_custody_id_fkey" FOREIGN KEY (mst_bank_custody_id) REFERENCES mst_bank_custody(id) ON UPDATE NO ACTION ON DELETE NO ACTION ;
ALTER TABLE "trx_porto" ADD CONSTRAINT "trx_porto_mst_kbmi_id_fkey" FOREIGN KEY (mst_kbmi_id) REFERENCES mst_kbmi(id) ;
ALTER TABLE "trx_porto" ADD CONSTRAINT "trx_porto_mst_kepemilikan_id_fkey" FOREIGN KEY (mst_kepemilikan_id) REFERENCES mst_kepemilikan(id) ;

ALTER TABLE "trx_porto_file" ADD CONSTRAINT "trx_porto_file_aut_user_id_fkey" FOREIGN KEY (aut_user_id) REFERENCES aut_user(id) ON UPDATE NO ACTION ON DELETE NO ACTION ;

ALTER TABLE "trx_porto_filedata" ADD CONSTRAINT "trx_porto_filedata_mst_bank_custody_id_fkey" FOREIGN KEY (mst_bank_custody_id) REFERENCES mst_bank_custody(id) ON UPDATE NO ACTION ON DELETE NO ACTION ;
ALTER TABLE "trx_porto_filedata" ADD CONSTRAINT "trx_porto_filedata_mst_issuer_id_fkey" FOREIGN KEY (mst_issuer_id) REFERENCES mst_issuer(id) ;
ALTER TABLE "trx_porto_filedata" ADD CONSTRAINT "trx_porto_filedata_mst_kbmi_id_fkey" FOREIGN KEY (mst_kbmi_id) REFERENCES mst_kbmi(id) ;
ALTER TABLE "trx_porto_filedata" ADD CONSTRAINT "trx_porto_filedata_mst_kepemilikan_id_fkey" FOREIGN KEY (mst_kepemilikan_id) REFERENCES mst_kepemilikan(id) ;
ALTER TABLE "trx_porto_filedata" ADD CONSTRAINT "trx_porto_filedata_mst_pengelolaan_id_fkey" FOREIGN KEY (mst_pengelolaan_id) REFERENCES mst_pengelolaan(id) ;
ALTER TABLE "trx_porto_filedata" ADD CONSTRAINT "trx_porto_filedata_mst_tenor_id_fkey" FOREIGN KEY (mst_tenor_id) REFERENCES mst_tenor(id) ;

ALTER TABLE "trx_rekap" ADD CONSTRAINT "fktrx_rekap81025" FOREIGN KEY (trx_porto_id) REFERENCES trx_porto(id) ;
ALTER TABLE "trx_rekap" ADD CONSTRAINT "fktrx_rekap848419" FOREIGN KEY (trx_twrr_id) REFERENCES trx_twrr(id) ;

ALTER TABLE "trx_twrr" ADD CONSTRAINT "fktrx_twrr289110" FOREIGN KEY (trx_twrr_file_id) REFERENCES trx_twrr_file(id) ;
ALTER TABLE "trx_twrr" ADD CONSTRAINT "trx_twrr_mst_bank_custody_id_fkey" FOREIGN KEY (mst_bank_custody_id) REFERENCES mst_bank_custody(id) ON UPDATE NO ACTION ON DELETE NO ACTION ;

ALTER TABLE "trx_twrr_file" ADD CONSTRAINT "trx_twrr_file_aut_user_id_fkey" FOREIGN KEY (aut_user_id) REFERENCES aut_user(id) ON UPDATE NO ACTION ON DELETE NO ACTION ;

ALTER TABLE "trx_twrr_filedata" ADD CONSTRAINT "fktrx_twrr_f238283" FOREIGN KEY (trx_twrr_file_id) REFERENCES trx_twrr_file(id) ;
ALTER TABLE "trx_twrr_filedata" ADD CONSTRAINT "trx_twrr_filedata_mst_bank_custody_id_fkey" FOREIGN KEY (mst_bank_custody_id) REFERENCES mst_bank_custody(id) ON UPDATE NO ACTION ON DELETE NO ACTION ;
ALTER TABLE "trx_twrr_filedata" ADD CONSTRAINT "trx_twrr_filedata_trx_twrr_id_fkey" FOREIGN KEY (trx_twrr_id) REFERENCES trx_twrr(id) ;

-- 2023-11-01 10:14:54.947163+00

ALTER TABLE "trx_rekap" ADD CONSTRAINT "fktrx_rekap81025" FOREIGN KEY (trx_porto_id) REFERENCES trx_porto(id) ;
ALTER TABLE "trx_rekap" ADD CONSTRAINT "fktrx_rekap848419" FOREIGN KEY (trx_twrr_id) REFERENCES trx_twrr(id) ;

ALTER TABLE "trx_twrr" ADD CONSTRAINT "fktrx_twrr289110" FOREIGN KEY (trx_twrr_file_id) REFERENCES trx_twrr_file(id) ;
ALTER TABLE "trx_twrr" ADD CONSTRAINT "trx_twrr_mst_bank_custody_id_fkey" FOREIGN KEY (mst_bank_custody_id) REFERENCES mst_bank_custody(id) ON UPDATE NO ACTION ON DELETE NO ACTION ;

ALTER TABLE "trx_twrr_file" ADD CONSTRAINT "trx_twrr_file_aut_user_id_fkey" FOREIGN KEY (aut_user_id) REFERENCES aut_user(id) ON UPDATE NO ACTION ON DELETE NO ACTION ;

ALTER TABLE "trx_twrr_filedata" ADD CONSTRAINT "fktrx_twrr_f238283" FOREIGN KEY (trx_twrr_file_id) REFERENCES trx_twrr_file(id) ;
ALTER TABLE "trx_twrr_filedata" ADD CONSTRAINT "trx_twrr_filedata_mst_bank_custody_id_fkey" FOREIGN KEY (mst_bank_custody_id) REFERENCES mst_bank_custody(id) ON UPDATE NO ACTION ON DELETE NO ACTION ;
ALTER TABLE "trx_twrr_filedata" ADD CONSTRAINT "trx_twrr_filedata_trx_twrr_id_fkey" FOREIGN KEY (trx_twrr_id) REFERENCES trx_twrr(id) ;

-- 2023-11-01 10:14:54.947163+00
