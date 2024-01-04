*----------------------------------------------------------------------*
*       CLASS ZCL_NEPTUNE_DXP_E2E_SAMPLE DEFINITION
*----------------------------------------------------------------------*
*
*----------------------------------------------------------------------*
class zcl_neptune_dxp_e2e_sample definition
  public
  create public .

  public section.

    interfaces /neptune/if_nad_server .

    types:
      begin of ty_data,
                value type string,
             end of   ty_data .

    data gs_data type ty_data .
  protected section.

    methods get_data .
  private section.
ENDCLASS.



CLASS ZCL_NEPTUNE_DXP_E2E_SAMPLE IMPLEMENTATION.


  method /neptune/if_nad_server~handle_on_ajax.
    case ajax_id.
      when 'GET_DATA'.
        get_data( ).
      when others.
    endcase.
  endmethod.                    "/NEPTUNE/IF_NAD_SERVER~HANDLE_ON_AJAX


  method get_data.

    data lv_dummy type string. " added unused variable on purpose

    case gs_data-value.
      when 'Value A'.
        gs_data-value = 'Value B'.
      when others.
        gs_data-value = 'Value A'.
    endcase.

  endmethod.                    "GET_DATA
ENDCLASS.
