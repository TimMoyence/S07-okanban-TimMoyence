
table(id(INT), name(TEXT), #user_id(INT), created_at(DATE), updated_at(DATE))

list(id(INT), name(TEXT), position(SMALLINT), #table_id(INT), created_at(DATE), updated_at(DATE))

card(id(INT), description(TEXT), position(SMALLINT), color(VARCHAR), #list_id(INT), created_at(DATE), updated_at(DATE))

user(id(INT), email(TEXT), password(TEXT), firstname (TEXT), lastname(TEXT), page_name(TEXT), created_at(DATE), updated_at(DATE) )

label(id(INT), name(TEXT), color(TEXT), created_at(DATE), updated_at(DATE))

card_has_label(#card_id(INTEGER), #label_id(INTEGER), created_at(DATE), updated_at(DATE))