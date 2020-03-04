# README

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|nickname|string|null: false|

### Association
- has_many :users_groups
- has_many :messaages
- has_many :groups, though: :users_groups

## groupテーブル
|Column|Type|Options|
|------|----|-------|
|nickname|string|null: false|

### Association
- has_many :users_groups
- has_many :messages
- has_many :users, though: :users_groups


### group_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

### messageテーブル
|Column|Type|Options|
|------|----|-------|
|body|string|
|image|string|
|user_id|string|null: false, foreign_key: true|
|group_id|string|null: false, foreign_key: true|

### Association
belongs_to :user
belongs_to :group


This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
