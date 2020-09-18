import dialogReducer from "../redux/reducers/dialogReducer";
import {
  FETCH_DIALOG,
  FETCH_DIALOG_ERROR,
  SET_DIALOG_OPEN,
  FETCH_DIALOG_SUCCESS,
  SET_PATIENT_DATA,
} from "../redux/types";

describe("dialogReducer", () => {
  it("should return the initial state", () => {
    expect(dialogReducer(undefined, {})).toEqual({
      fetchInProgress: false,
      error: {},
      open: "",
      patientId: "",
      response: {},
      data: {},
    });
  });

  it("should handle FETCH_DIALOG", () => {
    expect(
      dialogReducer(undefined, {
        type: FETCH_DIALOG,
      })
    ).toEqual({
      fetchInProgress: true,
      error: {},
      open: "",
      patientId: "",
      response: {},
      data: {},
    });

    expect(
      dialogReducer(
        {
          fetchInProgress: false,
          error: {},
          open: "edit",
          patientId: "1234567890",
          response: {},
          data: {},
        },
        {
          type: FETCH_DIALOG,
        }
      )
    ).toEqual({
      fetchInProgress: true,
      error: {},
      open: "edit",
      patientId: "1234567890",
      response: {},
      data: {},
    });
  });

  it("should handle FETCH_DIALOG_SUCCESS", () => {
    expect(
      dialogReducer(undefined, {
        type: FETCH_DIALOG_SUCCESS,
        response: { res: "res from API" },
      })
    ).toEqual({
      fetchInProgress: false,
      error: {},
      open: "",
      patientId: "",
      response: { res: "res from API" },
      data: {},
    });

    expect(
      dialogReducer(
        {
          fetchInProgress: true,
          error: {},
          open: "edit",
          patientId: "1234567890",
          response: {},
          data: {},
        },
        {
          type: FETCH_DIALOG_SUCCESS,
          response: { res: "res from API" },
        }
      )
    ).toEqual({
      fetchInProgress: false,
      error: {},
      open: "edit",
      patientId: "1234567890",
      response: { res: "res from API" },
      data: {},
    });
  });

  it("should handle FETCH_DIALOG_ERROR", () => {
    expect(
      dialogReducer(undefined, {
        type: FETCH_DIALOG_ERROR,
        response: { res: "res from API" },
        error: { error: "error" },
      })
    ).toEqual({
      fetchInProgress: false,
      open: "",
      patientId: "",
      response: { res: "res from API" },
      error: { error: "error" },
      data: {},
    });

    expect(
      dialogReducer(
        {
          fetchInProgress: true,
          error: {},
          open: "edit",
          patientId: "1234567890",
          response: {},
          data: {},
        },
        {
          type: FETCH_DIALOG_ERROR,
          response: { res: "res from API" },
          error: { error: "error" },
        }
      )
    ).toEqual({
      fetchInProgress: false,
      open: "edit",
      patientId: "1234567890",
      response: { res: "res from API" },
      error: { error: "error" },
      data: {},
    });
  });

  it("should handle SET_DIALOG_OPEN", () => {
    expect(
      dialogReducer(undefined, {
        type: SET_DIALOG_OPEN,
        open: "",
        patientId: "",
      })
    ).toEqual({
      fetchInProgress: false,
      error: {},
      open: "",
      patientId: "",
      response: {},
      data: {},
    });

    expect(
      dialogReducer(undefined, {
        type: SET_DIALOG_OPEN,
        open: "edit",
        patientId: "12345",
      })
    ).toEqual({
      fetchInProgress: false,
      error: {},
      open: "edit",
      patientId: "12345",
      response: {},
      data: {},
    });

    expect(
      dialogReducer(
        {
          fetchInProgress: false,
          error: { error: "error" },
          open: "create",
          patientId: "0000",
          response: { res: "res from API" },
          data: {},
        },
        {
          type: SET_DIALOG_OPEN,
          open: "edit",
          patientId: "12345",
        }
      )
    ).toEqual({
      fetchInProgress: false,
      error: { error: "error" },
      open: "edit",
      patientId: "12345",
      response: { res: "res from API" },
      data: {},
    });
  });

  it("should handle SET_PATIENT_DATA", () => {
    expect(
      dialogReducer(undefined, {
        type: SET_PATIENT_DATA,
        data: {},
      })
    ).toEqual({
      fetchInProgress: false,
      error: {},
      open: "",
      patientId: "",
      response: {},
      data: {},
    });

    expect(
      dialogReducer(undefined, {
        type: SET_PATIENT_DATA,
        data: { name: "Bob" },
      })
    ).toEqual({
      fetchInProgress: false,
      error: {},
      open: "",
      patientId: "",
      response: {},
      data: { name: "Bob" },
    });

    expect(
      dialogReducer(
        {
          fetchInProgress: false,
          error: { error: "error" },
          open: "create",
          patientId: "0000",
          response: { res: "res from API" },
          data: { name: "Kobe" },
        },
        {
          type: SET_PATIENT_DATA,
          data: { name: "Bob" },
        }
      )
    ).toEqual({
      fetchInProgress: false,
      error: { error: "error" },
      open: "create",
      patientId: "0000",
      response: { res: "res from API" },
      data: { name: "Bob" },
    });
  });
});
