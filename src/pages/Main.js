const Main = () => {
  return (
    <>
      <div class="row m-3">
        <div class=" shadow w-25 p-3">.col-md-8</div>
        <div class=" shadow w-75 p-3">.col-md-4</div>
      </div>
      <nav class="nav flex-column">
        <a class="nav-link active" aria-current="page" href="#">
          Active
        </a>
        <a class="nav-link" href="#">
          Link
        </a>
        <a class="nav-link" href="#">
          Link
        </a>
        <a class="nav-link disabled">Disabled</a>
      </nav>
      <div class="d-flex align-items-start">
        <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
          <button
            class="nav-link active"
            id="v-pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-home"
            type="button"
            role="tab"
            aria-controls="v-pills-home"
            aria-selected="true"
          >
            Home
          </button>
          <button
            class="nav-link"
            id="v-pills-profile-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-profile"
            type="button"
            role="tab"
            aria-controls="v-pills-profile"
            aria-selected="false"
          >
            Profile
          </button>
          <button
            class="nav-link"
            id="v-pills-disabled-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-disabled"
            type="button"
            role="tab"
            aria-controls="v-pills-disabled"
            aria-selected="false"
            disabled
          >
            Disabled
          </button>
          <button
            class="nav-link"
            id="v-pills-messages-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-messages"
            type="button"
            role="tab"
            aria-controls="v-pills-messages"
            aria-selected="false"
          >
            Messages
          </button>
          <button
            class="nav-link"
            id="v-pills-settings-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-settings"
            type="button"
            role="tab"
            aria-controls="v-pills-settings"
            aria-selected="false"
          >
            Settings
          </button>
        </div>
        <div class="tab-content" id="v-pills-tabContent">
          <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" tabindex="0">
            이것은 설정 탭의 관련 콘텐츠에 대한 자리 표시자 콘텐츠입니다. 다른 탭을 클릭하면 이 탭의 가시성이 다음 탭으로 전환됩니다. 탭 JavaScript는
            콘텐츠 가시성과 스타일을 제어하기 위해 클래스를 교체합니다. .nav탭, 알약 및 기타 구동 탐색 과 함께 사용할 수 있습니다 .
          </div>
          <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab" tabindex="0">
            ddd
          </div>
          <div class="tab-pane fade" id="v-pills-disabled" role="tabpanel" aria-labelledby="v-pills-disabled-tab" tabindex="0">
            이것은 설정 탭의 관련 콘텐츠에 대한 자리 표시자 콘텐츠입니다. 다른 탭을 클릭하면 이 탭의 가시성이 다음 탭으로 전환됩니다. 탭 JavaScript는
            콘텐츠 가시성과 스타일을 제어하기 위해 클래스를 교체합니다. .nav탭, 알약 및 기타 구동 탐색 과 함께 사용할 수 있습니다 .
          </div>
          <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab" tabindex="0">
            dvdv
          </div>
          <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab" tabindex="0">
            ...
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
