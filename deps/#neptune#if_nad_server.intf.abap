*"* components of interface /NEPTUNE/IF_NAD_SERVER
interface /NEPTUNE/IF_NAD_SERVER
  public .


  methods HANDLE_ON_REQUEST
    importing
      !APPLID type STRING
      !SERVER type ref to object
      !KEY_ID type STRING optional
      !KEY type STRING
      !REQUEST type /NEPTUNE/DATA_REQUEST
    changing
      !NAV_TO type STRING .
  methods HANDLE_ON_RESPONSE
    importing
      !APPLID type STRING
      !SERVER type ref to object
      !EVENT_ID type STRING
      !EVENT_KEY type STRING
      !KEY_ID type STRING optional
      !KEY type STRING
      !REQUEST type /NEPTUNE/DATA_REQUEST .
  methods HANDLE_ON_SUBMIT
    importing
      !APPLID type STRING
      !EVENT_ID type STRING
      !EVENT_VALUE type STRING optional
      !SERVER type ref to object
      !REQUEST type /NEPTUNE/DATA_REQUEST
    changing
      !NAV_TO type STRING .
  methods HANDLE_ON_AJAX
    importing
      !APPLID type STRING
      !AJAX_ID type STRING
      !AJAX_VALUE type STRING
      !SERVER type ref to object
      !REQUEST type /NEPTUNE/DATA_REQUEST
    exporting
      !RETURN type /NEPTUNE/AJAX_RETURN
    changing
      !NAVIGATION type /NEPTUNE/AJAX_NAVIGATION .
  methods HANDLE_ON_SYNC_IN
    importing
      !APPLID type STRING optional
      !SYNC_ID type STRING optional
      !LASTSYNCDATE type STRING optional
      !IT_SYNC_DATA type /NEPTUNE/SYNC_DATA_TT optional
    exporting
      !EX_STATUS type /NEPTUNE/SYNC_HEADER .
  methods HANDLE_ON_SYNC_OUT
    importing
      !APPLID type STRING
      !LASTSYNCDATE type STRING
      !SERVER type ref to object .
endinterface.
