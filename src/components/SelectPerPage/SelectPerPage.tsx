interface Prop {
  changeValue: (value: number) => void;
  resetPage: (value: number) => void;
}

export const SelectPerPage = ({ changeValue, resetPage }: Prop) => {
  return (
    <div className="form-group row">
      <div className="col-3 col-sm-2 col-xl-1">
        <select
          data-cy="perPageSelector"
          id="perPageSelector"
          className="form-control"
          onChange={event => {
            changeValue(+event.target.value);
            resetPage(1);
          }}
        >
          <option value="3">3</option>
          <option value="5" selected>
            5
          </option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>

      <label htmlFor="perPageSelector" className="col-form-label col">
        items per page
      </label>
    </div>
  );
};
